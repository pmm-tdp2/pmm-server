var allSockets = require("../main");
var iyem = require("iyem");
var travelService = require("./mock/travelServiceMock");
var haversine = require("haversine");
var travelResource = require("../resource/travelResource");
var travelDTOModel = require("../model/dto/travelDTO");
var sem = require('semaphore')(1);

/*function manageTravelRequest(travelID){
//the user has solicited a travel
//executed thread

    console.log("llamaron a manage request: "+travelID);
    threadManageTravel(travelID)
    .then((value)=>{
        console.log("####: valor: "+value);
        return value;
    });


    /*console.log("init manageTravelRequest");
    let slowProcess = iyem.create(()=>{
        console.log("entra al thread manageTravelRequest");
            threadManageTravel();
            $.finish(0); 
    });

    slowProcess.start(time).onFinish((result)=>{
        console.log("response:" +result);
    });*/
//}


function manageTravelRequest(travelID){
    console.log("######### ###########  ###########");
    console.log("#########   INICIO     ###########");
    console.log("######### ###########  ###########");

    return new Promise((resolve,reject)=>{
        var radiusA = 2000;
        var radiusB = 4000;
        var radiusC = 8000;
        var allRadius = [radiusA,radiusB,radiusC];
        var radiusSelected;
        var excludedDrivers = new Array();
        var indexRadius = 0;
        var amountDriversNotified = 0;
        var MAXDRIVERSNOTIFICATIONS = 3
        var AMOUNT_BUCLES_TO_WAIT = 6;
        var TIME_TO_WAIT = 5000; //5 seconds
        var REJECT_ERROR = 0;
        var REJECT_DRIVER_REQUEST = 1;
        var REJECT_TIMEOUT = 2;
        var REJECT_DRIVER_NO_FOUND = 3;
        var REJECT_RISE_RADIUS = 4;
        var responseOfDriverToTravels = travelResource.responseOfDriverToTravels;
    
        function bucleFunction(indexRadius,amountDriversNotified){
            
            return new Promise((resolveBucle,rejectBucle)=>{
                /*if(indexRadius > allRadius.length || amountDriversNotified >= MAXDRIVERSNOTIFICATIONS ){
                    //reject(REJECT_DRIVER_NO_FOUND);
                    console.log("========   se seperó el radio o las 3 notificaciones =========")
                    rejectBucle(REJECT_DRIVER_NO_FOUND);
                }*/

                //select radius
                radiusSelected = allRadius[indexRadius];
                console.log("========= iniciando nueva búsqueda ==========");
                console.log("RADIO ELEGIDO: "+radiusSelected);
                console.log("CHOFERES NOTIFICADOS: "+amountDriversNotified);
                console.log("=============================================");

        
                //obtain best driver
                var aDriverSelected = null;
                aDriverSelected = findBestDriver(travelID,radiusSelected,excludedDrivers);
                
                if(aDriverSelected != null){
                    console.log("se ha encontrado al mejor chofer con id: "+  aDriverSelected.id);
                        
                    //obtaining socket of driver
                    var connectionDrivers = allSockets.connectionDrivers;
                    var aConnectionDriver = null;
                    try {
                        if (connectionDrivers != undefined) {
                            //TODO: obtener el socket del chofer y no cualquiera
                            aConnectionDriver = connectionDrivers.values().next().value;
                        }else{
                            console.error("Problema en la inicialiación del server, no se puede acceder a los choferes");
                            rejectBucle(REJECT_ERROR);
                        }
                    } catch (err) {
                        console.error(err);
                        console.log("Hubo problemas al tratatar de encontrar el socket del chofer ");
                        //reject(REJECT_ERROR)
                        rejectBucle(REJECT_ERROR)
                    }
                    
                    //notify to driver if this is available
                    if (aConnectionDriver == null || aConnectionDriver == undefined) {
                        console.error("Driver selected now is dissconnected, id: "+aDriverSelected.id );
                        console.error("No se pudo obtener el socket del chofer");
                        //reject(REJECT_ERROR);
                        rejectBucle(REJECT_ERROR);
                    } else {
                        console.info("Driver selected is available");
                        
                        // logica de mandar el emit al chofer
                        var aTravel = travelService.findTravelById(travelID);
                        console.info("Datos del viaje: "+JSON.stringify(aTravel));
                        
                        // build DTO for driver
                        var aTravelNotificationDTO = new travelDTOModel.TravelNotificationDTO();
                        aTravelNotificationDTO.travelID = aTravel.travelID;
                        aTravelNotificationDTO.from = aTravel.from;
                        aTravelNotificationDTO.to = aTravel.to;
                        /*aTravelNotificationDTO.petAmountSmall = aTravel.petAmountSmall;
                        aTravelNotificationDTO.petAmountMedium = aTravel.petAmountMedium;
                        aTravelNotificationDTO.petAmountLarge = aTravel.petAmountLarge;
                        aTravelNotificationDTO.hasACompanion = aTravel.hasACompanion;*/
                        aTravelNotificationDTO.petAmountSmall = 1;
                        aTravelNotificationDTO.petAmountMedium = 1;
                        aTravelNotificationDTO.petAmountLarge = 1;
                        aTravelNotificationDTO.hasACompanion = "Si";

            
                        //notify to driver
                        aConnectionDriver.socket.emit("NOTIFICATION_OF_TRAVEL", aTravelNotificationDTO);
                        console.info("Se notificó el viaje al Chofer");
                        //amountDriversNotified++;

                        //map donde se almacenan las respuestas de los choferes
                        var responseOfDriverToTravels = travelResource.responseOfDriverToTravels;

                        console.log("Esperando la respuesta del chofer....");

                        function waitResponseDriver(amountIterations) {
                            return new Promise((resolveTimeout,rejectTimeout)=>{
                                setTimeout(()=>{
                                    console.log("======= esperando "+amountIterations*TIME_TO_WAIT+" ms ========");

                                        if (amountIterations <= 0){
                                            //Timeout
                                            rejectTimeout(REJECT_TIMEOUT);
                                        }else{
                                            console.log("evaluando si responde el chofer ");
                                            if(responseOfDriverToTravels.has(travelID)){
                                                console.log("el chofer respondió");
                                                amountIterations=0;
                                                var response = responseOfDriverToTravels.get(travelID);
                                                responseOfDriverToTravels.delete(travelID);
                                                if(response){
                                                    console.log("el chofer ACEPTO EL VIAJE");
                                                    resolveTimeout(true);
                                                }else{
                                                    //agregar el chofer para excluirlo de la búsqueda
                                                    //seguir buscando otros choferes
                                                    console.log("el chofer RECHAZO");
                                                    excludedDrivers.push(aDriverSelected.id);
                                                    resolveTimeout(false);
                                                }
                                            }else{
                                                //si aún no responde seguir iterando
                                                console.log("El chofer aún no RESPONDE");
                                                waitResponseDriver(--amountIterations)
                                                .then((dataResponse)=>{
                                                    resolveTimeout(dataResponse);
                                                })
                                                .catch((data)=>{
                                                    rejectTimeout(data);
                                                })
                                            }
                                        }
                                },TIME_TO_WAIT);

                            })
                        }

                        //llamando a waitResponseDriver por primera vez
                        waitResponseDriver(AMOUNT_BUCLES_TO_WAIT)
                        .then((dataResponse)=>{
                            if(dataResponse==true){
                                console.log("El ciclo terminó y el chofer aceptó el viaje");
                                //resolve(dataResponse);
                                resolveBucle(dataResponse);
                            }else{
                                console.log("El ciclo terminó y el chofer rechazó el viaje");
                                //reject(REJECT_DRIVER_REQUEST);
                                //rejectBucle(REJECT_DRIVER_REQUEST);
                
                                if( amountDriversNotified >= MAXDRIVERSNOTIFICATIONS || indexRadius >= allRadius.length-1 ){
                                    //reject(REJECT_DRIVER_NO_FOUND);
                                    console.log("===  se superó el radio o max de rechazos ===");
                                    rejectBucle(REJECT_DRIVER_NO_FOUND);
                                }else{
                                    //driver reject travel
                                    //bucleFunction(indexRadius,++amountDriversNotified)
                                    bucleFunction(indexRadius,++amountDriversNotified)
                                    .then((value)=>{
                                        if(value) {
                                            console.log("se encontró el chofer incrementando el radio a: "+indexRadius);
                                            //resolve(value);
                                            resolveBucle(value);
                                        }
                                    })
                                    .catch((value)=>{
                                        console.log("No se encontró el chofer incrementando el radio a "+indexRadius);
                                        //reject(value)
                                        rejectBucle(value)
                                    });

                                }

                            }
                        })
                        .catch((data)=>{
                            //reject(REJECT_TIMEOUT);
                            //timeout
                            rejectBucle(data);
                        });

                    }
        
                }else{
                    //rejectBucle(REJECT_RISE_RADIUS);
                    //driver not found, increase the radius... se tiene que ver
                    console.log("no se encontró choferes en el radio de búsqueda: "+radiusSelected);
                    if(amountDriversNotified >= MAXDRIVERSNOTIFICATIONS || indexRadius >= allRadius.length-1 ){
                        console.log("===  se superó el radio o max de rechazos ===");
                        rejectBucle(REJECT_DRIVER_NO_FOUND);
                    }else{
                        bucleFunction(++indexRadius,amountDriversNotified)
                        .then((value)=>{
                            if(value) {
                                console.log("se encontró el chofer incrementando el radio a: "+allRadius[indexRadius]);
                                //resolve(value);
                                resolveBucle(value);
                            }
                        })
                        .catch((value)=>{
                            console.log("No se encontró el chofer incrementando el radio a "+allRadius[indexRadius]);
                            console.log("valor del reject=========: "+value);
                            //reject(value)
                            rejectBucle(value)
                        });
                    }
                }
            });
        }
    
        //llamando a bucleFunction
        bucleFunction(indexRadius,++amountDriversNotified)
        .then((value)=>{
            console.log("<<<<<<<<< saliendo de la búsqueda del chofer y se acepto el viaje");
            resolve(value);
        })
        .catch((value)=>{
            if(value == REJECT_TIMEOUT){
                console.log("<<<<<<<<< saliendo de la búsqueda por timeout");
                //evaluar si se puede seguir buscando...
                reject(value);
            }
            else if(value == REJECT_ERROR){
                console.log("<<<<<<<<< saliendo de la búsqueda por un error");
                reject(value);
            }
            else if(value == REJECT_DRIVER_NO_FOUND){
                console.log("<<<<<<<<<< saliendo de la búsqueda porque no encontró chofer");
                reject(value);
            }
            else{
                console.log("<<<<<<<< saliendo por un error desconocido: "+value);
            }
        })
    });
}




/**
 * @param {travelID to obtain point origin of travel} travelID 
 * @param {radius in meters} searchRadius 
 * @param {drivers excluded for this travel} excludedDrivers 
 */

var driversMock = require("./mock/partyServiceMock");

function findBestDriver(travelID, searchRadius, excludedDrivers){
        console.info("travelRequestMAnager: "+ "findDriver. travelID: "+ travelID);
        var candidateDrivers = new Array();

        // find optimum driver for user
        // is a map that contain (key,value) -> (travelID, GeographicCoordinate)
        // var positionsDrivers = allSockets.positionsDrivers;
        var positionsDrivers = driversMock.allDriversMock;

        if (positionsDrivers == undefined || positionsDrivers == null || positionsDrivers.size == 0)
            return null;

        console.log("cantidad de choferes mandando posiciones: "+positionsDrivers.size);
        console.log("BUSCANDO CHOFERES con un RADIO en metros de: "+searchRadius);

        //find the travel to obtain origin of travel
        var aTravel = travelService.findTravelById(travelID);

        var candidateDrivers = new Array();

        positionsDrivers.forEach( (value, key) => {
            distance = haversine(value, aTravel.from,{unit: 'meter'});
            console.log("latitude Driver: "+value.latitude);
            console.log("longitude Driver: "+value.longitude);
            console.log("latitude origin "+aTravel.from.latitude);
            console.log("longitude origin "+aTravel.from.latitude);
            console.log("distancia: "+distance);
            if(distance < searchRadius){
                //obtain driver to evaluate his score
                console.log("El chofer está dentro del radio de búsqueda");
                var aDriver = travelService.findDriver(key);
                candidateDrivers.push(aDriver);
            }
        });

        console.log("*** terminó la búsqueda de choferes ***");

        if (candidateDrivers.length == 0){
            console.log("No se encontraron choferes candidatos en el radio: "+searchRadius);
            return null;            
        }else{
            console.log("Antes de excluir choferes que rechazaron el viaje hay: "+candidateDrivers.length + " choferes");
        }

        //take out excluded drivers
        if(excludedDrivers != null ){
            excludedDrivers.forEach(driverID => {
                console.log("chofer excluido con id: "+driverID);
                //find index of driver with id
                index = candidateDrivers.findIndex(driver => {
                    return driver.id == driverID;
                })
                //remove driver
                candidateDrivers.splice(index,1);
            });
        }    

        if (candidateDrivers.length == 0){
            console.log("No queadaron choferes Luego de haber excluir Choferes en el radio de búsqueda: "+searchRadius);
            return null;
        }else{
            console.log("Luego de haber excluido quedaron: "+candidateDrivers.length +" choferes");
        }

        //ordering drivers in descending order
        //atribiute priority is score + pointsCategory
        candidateDrivers.sort( function (a,b){
            return b.priority - a.priority;
        });


        //returns the best driver
        /*var driver1 = null;
        var driver2 = null;
        var bestDriver = null;*/

        /*candidateDrivers.forEach(driver => {
            if(driver1 == null){
                driver1 = driver;
                bestDriver = driver1;
            }else if(driver2 == null){
                driver2 =  driver;
                if(driver1.priority > driver2.priority)
                    return driver1;
                else if(driver1.priority < driver2.priority)
                    return driver2;
                else{
                    driver1.amountTravels > driver2.amountTravels
                }
            }
        });*/

        // por ahora solo mando el mejor posicionado por priordidad luego se optimiza

        return candidateDrivers[0];
}

module.exports={
    manageTravelRequest:manageTravelRequest
}