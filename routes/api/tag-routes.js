const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['product_name']
      }
    ]
  })
  .then(dbTagInfo => res.json(dbTagInfo))
  .catch(err => {
    res.status(500).json(err)
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: req.params.id,
    include: [
      {
        model: Product,
        attributes: ['product_name']
      }
    ]
  })
  .then(dbTagData => {
    if(!dbTagData) {
        res.status(400).json({ message: 'No product found with this id' })
        return;
    }
    res.json(dbTagData)
})
.catch(err => {
    console.log(err);
    res.status(500).json(err)
})
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.json(err)
  })
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => {
    if(!dbTagData){
      res.status(404).json({message: 'no tag found with this id'})
      return
    }
    res.json(dbTagData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
        id: req.params.id
    }
})
.then(dbTagData => {
    if(!dbTagData) {
        res.status(404).json({ message: 'No tag found with this id' })
        return;
    }
    res.json(dbTagData)
})
.catch(err => {
    console.log(err);
    res.status(500).json(err)
})
});

module.exports = router;
