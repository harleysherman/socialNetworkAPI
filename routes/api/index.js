const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

router.use('/thought', thoughtRoutes);
router.use('/user', userRoutes);

router.use((req, res) => {
  return res.send('Wrong route!');
});

module.exports = router;
