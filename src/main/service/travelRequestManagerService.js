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
    console.log("######### INICIO  ###########");

    return new Promise((resolve,reject)=>{
        var radiusA = 2000;
        var radiusB = 4000;
        var radiusC = 8000;
        var radiusD = 12000;
        var allRadius = [radiusA,radiusB,radiusC,radiusD];
        var radiusSelected=radiusA;
        var excludedDrivers = new Array();
        var indexRadius = 0;
        var amountDriversNotified = 0;
        var MAXDRIVERSNOTIFICATIONS = 3
        var AMOUNT_BUCLES_TO_WAIT = 6;
        var TIME_TO_WAIT = 5000; //5 seconds
        var REJECT_ERROR = 0;
        var REJECT_DRIVER_REQUEST = 1;
        var REJECT_TIMEOUT = 2;
        var REJECT_DRIVER_NO_FOUND = 2;
        var REJECT_RISE_RADIUS = 3;
        var responseOfDriverToTravels = travelResource.responseOfDriverToTravels;
    
        function bucleFunction(indexRadius,amountDriversNotified){
            console.log("VALORES::::indice: "+ indexRadius+ "  %%  notificaciones: "+amountDriversNotified);
            return new Promise((resolveBucle,rejectBucle)=>{

                if(indexRadius > allRadius.length || amountDriversNotified >= MAXDRIVERSNOTIFICATIONS ){
                    //reject(REJECT_DRIVER_NO_FOUND);
                    console.log("0000000000    se seperó el radio 000000000000000")
                    reject(REJECT_DRIVER_NO_FOUND);
                }

                //select radius
                radiusSelected = allRadius[indexRadius];
                console.log("RADIO ELEGIDO: "+radiusSelected);
        
                //obtain best driver
                console.log("buscando choferes con un radio en metros de : "+radiusSelected);
                var aDriverSelected = null;
                aDriverSelected = findBestDriver(travelID,radiusSelected,excludedDrivers);
                
                if(aDriverSelected != null){
                    console.log("se ha encontrado el mejor chofer con id: "+  aDriverSelected.id);
                        
                    //obtaining socket of driver
                    var connectionDrivers = allSockets.connectionDrivers;
                    var aConnectionDriver = null;
                    try {
                        if (connectionDrivers != undefined) {
                            //obtener el socket del chofer
                            aConnectionDriver = connectionDrivers.values().next().value;
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

                        console.info("antes de buscar el travel con id: "+travelID);

                        var aTravel = travelService.findTravelByTravelID(travelID);

                        console.info("Luego buscar el travel: "+JSON.stringify(aTravel));
                        
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
                        console.info("Luego de crear el DTO para responder");

                        aConnectionDriver.socket.emit("NOTIFICATION_OF_TRAVEL", aTravelNotificationDTO);
                        amountDriversNotified++;

                        //map donde se almacenan las respuestas de los choferes
                        var responseOfDriverToTravels = travelResource.responseOfDriverToTravels;

                        console.log("empieza simulación del timeout para el chofer");

                        function waitResponseDriver(amountIterations) {
                            return new Promise((resolveTimeout,rejectTimeout)=>{
                                setTimeout(()=>{
                                    console.log("==============entro al delay ==================");
                                        amountIterations--;
                                        //quiero que termine cuando envia a dos choferes
                                        if (amountIterations <= 0){
                                            //Timeout
                                            rejectTimeout(amountIterations);
                                        }else{
                                            console.log("evaluandooooooo si responde el chofer con id: "+travelID);
                                        
                                            if(responseOfDriverToTravels.has(travelID)){
                                                console.log("el chofer respondió");
                                                amountIterations=0;
                                                var response = responseOfDriverToTravels.get(travelID);
                                                responseOfDriverToTravels.delete(travelID);
                                                if(response){
                                                    console.log("el chofer ACEPTO");
                                                    resolveTimeout(true);
                                                }else{
                                                    //agregar el chofer para excluirlo de la búsqueda
                                                    //seguir buscando otros choferes
                                                    if(indexRadius >= allRadius.length || amountDriversNotified >= MAXDRIVERSNOTIFICATIONS ){
                                                        console.log("0000000000   se superó la cantidad de notificaciones 0000000000000000")
                                                        rejectBucle(REJECT_DRIVER_NO_FOUND);
                                                    }else{
                                                        bucleFunction(indexRadius,amountDriversNotified)
                                                        .then((value)=>{
                                                            if(value) {
                                                                console.log("se encontró el chofer volviendo a buscar con el mismo radio: "+indexRadius);
                                                                //resolve(value);
                                                                resolveBucle(value);
                                                            }
                                                        })
                                                        .catch((value)=>{
                                                            console.log("No se encontró el chofer volviendo a buscar con el mismo radio: "+indexRadius);
                                                            console.log("valor del reject: "+value);
                                                            //reject(value)
                                                            rejectBucle(value)
                                                        });
                                                    }
                                                    /*console.log("el chofer RECHAZO");
                                                    excludedDrivers.push(aDriverSelected.id);
                                                    resolveTimeout(false);*/
                                                }
                                            }else{
                                                //si aún no responde seguir iterando
                                                waitResponseDriver(amountIterations)
                                                .then((dataResponse)=>{
                                                    if(dataResponse==true){
                                                        console.log("El ciclo terminóooo y el chofer aceptó el viaje");
                                                        //resolve(dataResponse);
                                                        resolveBucle(dataResponse)
                                                    }else{
                                                        console.log("El ciclo terminóoo y el chofer rechazó el viaje");
                                                        //reject(REJECT_DRIVER_REQUEST);
                                                        rejectBucle(REJECT_DRIVER_REQUEST);

                                                    }
                                                })
                                                .catch((data)=>{
                                                    console.log("TIMEOUT");
                                                    //reject(REJECT_TIMEOUT);
                                                    rejectBucle(REJECT_TIMEOUT);
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
                                rejectBucle(REJECT_DRIVER_REQUEST);
                            }
                        })
                        .catch((data)=>{
                            console.log("TIMEOUT");
                            //reject(REJECT_TIMEOUT);
                            rejectBucle(REJECT_TIMEOUT);
                        });

                        console.log("mensaje desde afuera del timeout");
                    }
        
                }else{
                    //rejectBucle(REJECT_RISE_RADIUS);
                    //driver not found, increase the radius... se tiene que ver
                    if(indexRadius >= allRadius.length || amountDriversNotified >= MAXDRIVERSNOTIFICATIONS ){
                        console.log("0000000000    se seperó el radio 0000000000000000")
                        console.log("0000000000   o la cantidad de notificaciones 0000000000000000")
                        rejectBucle(REJECT_DRIVER_NO_FOUND);
                    }else{
                        bucleFunction(++indexRadius,amountDriversNotified)
                        .then((value)=>{
                            if(value) {
                                console.log("se encontró el chofer incrementando el radio a: "+indexRadius);
                                //resolve(value);
                                resolveBucle(value);
                            }
                        })
                        .catch((value)=>{
                            console.log("No se encontró el chofer incrementando el radio a "+indexRadius);
                            console.log("valor del reject: "+value);
                            //reject(value)
                            rejectBucle(value)
                        });
                    }
                }
            });
        }
    
        //llamando a bucleFunction
        bucleFunction(indexRadius,amountDriversNotified)
        .then((value)=>{
            console.log("saliendo de la búsqueda del chofer y se acepto el viaje");
            resolve(value);
        })
        .catch((value)=>{
            if(value == REJECT_TIMEOUT){
                console.log("<<<<<<<<<saliendo de la búsqueda por timeout");
                reject(value);
            }
            else if(value == REJECT_DRIVER_REQUEST || value == REJECT_RISE_RADIUS){
                //console.log("<<<<<<<<<saliendo de la búsqueda. chofer NO se acepto el viaje y se incrementará el radio");
                console.log("<<<<<<<<<saliendo de la búsqueda. chofer NO se acepto el viaje, buscando otros choferes en el mismo radio");
                //console.log("<<<<<<<<<<saliendo de la búsqueda porque no encontró chofer");
                console.log("==========================================================================");

                //driver not found, increase the radius... se tiene que ver
                bucleFunction(indexRadius,++amountDriversNotified)
                .then((value)=>{
                    if(value) {
                        console.log("se encontró el chofer incrementando el radio a: "+indexRadius);
                        resolve(value);
                        //resolveBucle(value);
                    }
                })
                .catch((value)=>{
                    console.log("No se encontró el chofer incrementando el radio a "+indexRadius);
                    reject(value)
                    //rejectBucle(value)
                });
            }
            else if(value == REJECT_ERROR){
                console.log("<<<<<<<<<saliendo de la búsqueda por un error");
                reject(value);
            }
            else if(value == REJECT_DRIVER_NO_FOUND){
                console.log("<<<<<<<<<<saliendo de la búsqueda porque no encontró chofer");
                reject(value);
            }
            else{
                console.log("<<<<<<<<error desconocido: "+value);
            }
        })
    });
}




/*function waitToDriverResponse(travelID){
    return promise =  new Promise((resolve,reject)=>{
        //evaluate timer
        var amountBucles = 0;
        var maxAmountBucles = 12;
        var responseOfDriverToTravels = travelResource.responseOfDriverToTravels;
        //amountDriversNotified++;
        console.log("empieza simulación de esperar la respuesta");
        //while(amountBucles < maxAmountBucles){
            //setTimeout(()=>{
                console.log("respuestas de choferes");
                console.log(JSON.stringify(responseOfDriverToTravels));
                if(responseOfDriverToTravels.has(travelID)) {
                    console.log("llegó respuesta");
                    if(responseOfDriverToTravels.get(travelID)){
                        //driverFound= true;
                        resolve("todo bien");
                    }
                    else{
                        //excludedDrivers.push(aDriverSelected.id);
                        reject("REJECTED_TRAVEL");
                    }
                    responseOfDriverToTravels.delete(travelID);
                    amountBucles= maxAmountBucles;
                }
                amountBucles++;
                amountBucles = maxAmountBucles;
                console.log("bucle nro: "+amountBucles);
            //},5000); 
        //}

        //if(amountBucles >= maxAmountBucles-1)
            reject("TIMEOUT");
        console.log("mensaje desde afuera del timeout");

    });

}*/





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
        //var positionsDrivers = allSockets.positionsDrivers;
        var positionsDrivers = driversMock.allDriversMock;

        if (positionsDrivers == undefined || positionsDrivers == null || positionsDrivers.size == 0)
            return null;

        console.log("cantidad de choferes mandando posiciones: "+positionsDrivers.size);

        console.log("hay choferes ");
        console.log("buscando choferes con un radio en m de: "+searchRadius);
        var aTravel = travelService.findTravelById(travelID);
        var candidateDrivers = new Array();

        positionsDrivers.forEach( (value, key, positionsDrivers) => {
            distance = haversine(value, aTravel.from,{unit: 'meter'});
            console.log("posDriver..: "+value.latitude);
            console.log("from..: "+aTravel.from.latitude);
            console.log("distancia..: "+distance);
            console.log("radio..: "+searchRadius);
            if(distance < searchRadius){
                //obtain driver to evaluate his score
                console.log("se va buscar un chofer con travel service mock");
                var aDriver = travelService.findDriver(key);
                candidateDrivers.push(aDriver);
            }else{
                console.log("que carajos...");
            }
        });

        console.log("terminó la búsqueda de choferes");

        if (candidateDrivers.length == 0){
            console.log("no hay choferes candidatos");
            return null;            
        }else{
            console.log("antes de la exclusión hay choferes: "+candidateDrivers.length);
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
                console.log("removing index: "+index);
                candidateDrivers.splice(index,1);
            });
        }    

        if (candidateDrivers.length == 0){
            console.log("luego de haber excluido a choferes que que rechazaron no queda ninguno");
            return null;
        }else{
            console.log("luego de haber excluido  hay choferes: "+candidateDrivers.length);
        }


        //ordering drivers in descending order
        //atribiute priority is score + pointsCategory
        candidateDrivers.sort( function (a,b){
            return b.priority - a.priority;
        });

        console.log("se han encontrado "+candidateDrivers.length+" choferes candidatos");

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