var allSockets = require("../main");
var iyem = require("iyem");
var travelService = require("./mock/travelServiceMock");
var haversine = require("haversine");
var travelResource = require("../resource/travelResource");
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
        var radiusE = 20000;
        var allRadius = [radiusA,radiusB,radiusC,radiusD,radiusE];
        var radiusSelected=radiusA;
        var driverFound = false
        var excludedDrivers = new Array();
        var indexRadius = 0;
        var amountDriversNotified = 0;
        var maxDriversNotified = 3
        var responseOfDriverToTravels = travelResource.responseOfDriverToTravels;
    
        function bucleFunction(indexRadius,amountDriversNotified){
            console.log("VALORES::::indice: "+ indexRadius+ "  %%  notificaciones: "+amountDriversNotified);
            return new Promise((resolve,reject)=>{
                //select radius
                radiusSelected = allRadius[indexRadius];
        
                //obtain best driver
                console.log("buscando choferes con un radio en m de : "+radiusSelected);
                var aDriverSelected = null;
                aDriverSelected = findBestDriver(travelID,radiusSelected,excludedDrivers);
                
                if(aDriverSelected != null){
                    console.log("se ha encontrado el mejor chofer con id: "+  aDriverSelected.id);
                        
                    amountDriversNotified++;
                    //obtener socket y notificar al chofer

                    //timer de espera
                    var amountBucles = 0;
                    var maxAmountBucles = 12;

                    //map que sirve para ver las respuestas de los choferes
                    var responseOfDriverToTravels = travelResource.responseOfDriverToTravels;

                    console.log("empieza simulación del timeout");
                    //while(amountBucles < maxAmountBucles){
                        setTimeout(()=>{
                            console.log("entro al timeout");
                            //quiero que termine cuando envia a dos choferes
                            if (amountDriversNotified > 1){
                                resolve(true);
                            }else{
                                bucleFunction(indexRadius,amountDriversNotified)
                                .then((value)=>{
                                    if(value) {
                                        console.log("salió por value");
                                        resolve(true);
                                    }
                                })
                            }
                        },5000); 
                    //}
    
                    if(amountBucles >= maxAmountBucles){
                        driverFound= true;
                        console.log("probando la salida del bucle....");
                    }
                    console.log("mensaje desde afuera del timeout");
        
                }else{
                    //driver not found, increase the radius
                    bucleFunction(indexRadius++,amountDriversNotified)
                    .then((value)=>{
                        if(value) {
                            console.log("salió por value");
                            resolve(true);
                        }
                    })
                }
            });
        }
    
        bucleFunction(indexRadius,amountDriversNotified)
        .then((value)=>{
            if(value) {
                console.log("salió por value");
                resolve(0);
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
                candidateDrivers.splice(0,index);
            });
        }    

        if (candidateDrivers.length == 0){
            console.log("luego de haber excluido a choferes que que rechazaron no queda ninguno");
            return null;
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