var repository = require("../repository/userCredentialsRepository");





exports.login = function login(id) {
  console.info("userCredentialsService: login");
  return repository.findUserCredentials(id);
};

exports.register = function register(userCredentialsRequestDTO) {
  console.info("userCredentialsService: register");
    if (okPreconditionParty(userCredentialsRequestDTO)) {
        if (userCredentialsRequestDTO.id == "USER") {
            repository.createUser(userCredentialsRequestDTO);
        } else if (userCredentialsRequestDTO.id == "DRIVER") {
            repository.createDriver(userCredentialsRequestDTO);
        }       
        repository.createUserCredentials(userCredentialsRequestDTO, partyID);
    }
};

function okPreconditionParty(userCredentialsRequestDTO) {
    return userCredentialsRequestDTO.firstName != null && String.toString(userCredentialsRequestDTO.firstName).length != 0;
}