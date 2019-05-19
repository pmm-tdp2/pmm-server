var repository = require("../repository/userCredentialsRepository");

exports.login = function login(id) {
    console.info("userCredentialsService: login");
    return repository.find(id);
};

exports.register = function register(userCredentialsRequestDTO) {
    console.info("userCredentialsService: register");
    return repository.create(userCredentialsRequestDTO);
    /*
    if (okPreconditionParty(userCredentialsRequestDTO)) {
        if (userCredentialsRequestDTO.id == "USER") {
            repository.createUserCredentials(userCredentialsRequestDTO);
        } else if (userCredentialsRequestDTO.id == "DRIVER") {
            repository.createDriver(userCredentialsRequestDTO);
        }
        repository.createUserCredentials(userCredentialsRequestDTO);
    }
    */
};

exports.findByPK = function findByPK(id) {
    console.info("userCredentialsService: findByPK");
    return repository.find(id);
};

function okPreconditionParty(userCredentialsRequestDTO) {
    return userCredentialsRequestDTO.firstName != null && String.toString(userCredentialsRequestDTO.firstName).length != 0;
}