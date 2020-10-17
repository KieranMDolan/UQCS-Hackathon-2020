const express = require('express');
const router = express.Router();
const passport = require("passport");
const jwt = require('jsonwebtoken');

router.get('/',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));
router.get('/failed', (req, res) => res.send('You Failed to log in!'))

router.get( '/callback',
    passport.authenticate( 'google', {
        failureRedirect: '/auth/failure'
}, async (req, res)=> {
    //Success
    console.log("SUCCESS", res.user);
    const token = await jwt.sign(payload, process.env.JWT_SIGN, { expiresIn: "10 hours" })
    return res.json({ token });
}));

module.exports = router;