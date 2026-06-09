const AlertaEquipamento = require('../models/AlertaEquipamento');

exports.criarAlerta = async (req, res) => {
  try {
    const novoAlerta = await AlertaEquipamento.create(req.body);
    res.status(201).json({
      sucesso: true,
      dados: novoAlerta
    });
  } catch (erro) {
    res.status(400).json({ sucesso: false, erro: erro.message });
  }
};

exports.buscarAlertas = async (req, res) => {
  try {
    const { estacaoId, tipoAlerta, resolvido } = req.query;
    let filtro = {};

    if (estacaoId) filtro.estacaoId = estacaoId;
    if (tipoAlerta) filtro.tipoAlerta = tipoAlerta;
    if (resolvido !== undefined) filtro.resolvido = resolvido === 'true';

    const alertas = await AlertaEquipamento.find(filtro).sort({ timestamp: -1 });
    
    res.status(200).json({
      sucesso: true,
      quantidade: alertas.length,
      dados: alertas
    });
  } catch (erro) {
    res.status(500).json({ sucesso: false, erro: erro.message });
  }
};

exports.buscarAlertaPorId = async (req, res) => {
  try {
    const alerta = await AlertaEquipamento.findById(req.params.id);
    if (!alerta) {
      return res.status(404).json({ sucesso: false, mensagem: 'Alerta não encontrado' });
    }
    res.status(200).json({ sucesso: true, dados: alerta });
  } catch (erro) {
    res.status(500).json({ sucesso: false, erro: erro.message });
  }
};

exports.resolverAlerta = async (req, res) => {
  try {
    const alerta = await AlertaEquipamento.findByIdAndUpdate(
      req.params.id, 
      { resolvido: true }, 
      { new: true, runValidators: true }
    );

    if (!alerta) {
      return res.status(404).json({ sucesso: false, mensagem: 'Alerta não encontrado' });
    }
    res.status(200).json({ sucesso: true, dados: alerta });
  } catch (erro) {
    res.status(400).json({ sucesso: false, erro: erro.message });
  }
};

exports.deletarAlerta = async (req, res) => {
  try {
    const alerta = await AlertaEquipamento.findByIdAndDelete(req.params.id);
    if (!alerta) {
      return res.status(404).json({ sucesso: false, mensagem: 'Alerta não encontrado' });
    }
    res.status(200).json({ sucesso: true, dados: {} });
  } catch (erro) {
    res.status(500).json({ sucesso: false, erro: erro.message });
  }
};