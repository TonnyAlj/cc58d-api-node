const mongoose = require('mongoose');

const AlertaEquipamentoSchema = new mongoose.Schema({

  estacaoId: {
    type: String,
    required: [true, 'O ID da estação é obrigatório']
  },
  tipoAlerta: {
    type: String,
    required: [true, 'O tipo de alerta é obrigatório'],
    enum: [
      'FALHA_REDE', 
      'EQUIPAMENTO_LIGADO', 
      'EQUIPAMENTO_DESLIGADO',
      'FALHA_ENERGIA',
      'SENSOR_INATIVO'
    ]
  },
  descricao: {
    type: String,
    trim: true,
    default: 'Sem descrição adicional'
  },
  gravidade: {
    type: String,
    enum: ['BAIXA', 'MEDIA', 'ALTA', 'CRITICA'],
    default: function() {
      if (this.tipoAlerta === 'FALHA_REDE' || this.tipoAlerta === 'FALHA_ENERGIA') return 'CRITICA';
      if (this.tipoAlerta === 'SENSOR_INATIVO') return 'MEDIA';
      return 'BAIXA'; // Para LIGADO/DESLIGADO
    }
  },
  resolvido: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AlertaEquipamento', AlertaEquipamentoSchema);