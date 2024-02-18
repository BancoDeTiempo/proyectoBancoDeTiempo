const Contract = require("../models/Contract.model");
const User = require("../models/User.model");

const createDarumaMedal = async (contractId) => {
    await User.syncIndexes();
  
    try {
        const finalizedContract = await Contract.findById(contractId);
        const contractUsersId = finalizedContract.userOne&&userTwo._id.toString;
    
        const contractUsers = await User.find({ _id: { $in: contractUsersId } });
    
        contractUsers.forEach(async (user) => {
          let daruma = '';
    
          if (user.completedService.length >= 1) {
            daruma = 'Daruma de Papel';
          } else if (user.completedService.length >= 5) {
            daruma = 'Daruma de Paja';
          } else if (user.completedService.length >= 10) {
            daruma = 'Daruma de Piedra';
          } else if (user.completedService.length >= 15) {
            daruma = 'Daruma de Mármol';
          } else if (user.completedService.length >= 20) {
            daruma = 'Daruma de Obsidiana';
          } else if (user.completedService.length >= 25) {
            daruma = 'Daruma de Acero';
          } else if (user.completedService.length >= 30) {
            daruma = 'Daruma de Bronce';
          } else if (user.completedService.length >= 40) {
            daruma = 'Daruma de Plata';
          } else if (user.completedService.length >= 50) {
            daruma = 'Daruma de Oro';
          } else if (user.completedService.length >= 70) {
            daruma = 'Daruma de Platino';
          } else if (user.completedService.length >= 90) {
            daruma = 'Daruma de Diamante';
          } else if (user.completedService.length >= 100) {
            daruma = 'Daruma de ArcoIris';
          } else {
            daruma = 'Sin Darumas';
          }
    
          console.log(`Usuario: ${user.username}, Servicios Completados: ${usuario.completedService}, Daruma: ${darumaMedal}`);
    
          usuario.darumaMedal.push(daruma);
          await user.save();
        });
    
        console.log('Darumas asignados correctamente.');
      } catch (error) {
        console.error('Error al asignar darumas:', error);
      }
    };
    
// Exportamos función createDarumaMedal
module.exports = {
    createDarumaMedal
  };