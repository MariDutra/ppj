let materials = [
    { id: 1, name: 'Papel', description: 'Material feito de fibras vegetais.' },
    { id: 2, name: 'Plástico', description: 'Material sintético derivado do petróleo.' },
    { id: 3, name: 'Vidro', description: 'Material sólido e transparente.' },
    { id: 4, name: 'Metal', description: 'Material composto de elementos metálicos.' },
    { id: 5, name: 'Organico', description: 'Resíduos de origem biológica.' }
];

exports.getAllMaterials = (req, res) => {
    res.json(materials);
};

exports.createMaterial = (req, res) => {
    const newMaterial = { id: materials.length + 1, ...req.body };
    materials.push(newMaterial);
    res.status(201).json(newMaterial);
};

exports.updateMaterial = (req, res) => {
    const materialId = parseInt(req.params.id, 10);
    const updatedMaterial = { id: materialId, ...req.body };
    materials = materials.map(material => material.id === materialId ? updatedMaterial : material);
    res.json(updatedMaterial);
};

exports.deleteMaterial = (req, res) => {
    const materialId = parseInt(req.params.id, 10);
    materials = materials.filter(material => material.id !== materialId);
    res.status(204).send();
};
