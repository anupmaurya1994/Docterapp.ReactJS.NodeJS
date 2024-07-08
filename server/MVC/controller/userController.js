const db = require('../model')
const userModel = db.userModel

const userRegister = async (req, res) => {
    try {
        const { Email, Password, Comfirm_Password, T_and_C } = req.body
        if (!Email) { res.json({ status: false, message: 'Email required' }) }
        else if (!Password) { res.json({ status: false, message: 'Password required' }) }
        else if (!Comfirm_Password) { res.json({ status: false, message: 'Comfirm_Password required' }) }
        else if (!T_and_C) { res.json({ status: false, message: "Pleace Check Term's and Condition" }) }
        else {
            const isEmail = await userModel.count({ Email })
            if (isEmail) {
                res.json({ status: false, message: 'Email already exists' })
            } else {
                if (req.path) {
                    await userModel.create({
                        Email,
                        Password,
                        Comfirm_Password,
                        T_and_C,
                    })
                    res.json({ status: true, message: 'Data recorded successfully...' })
                }
            }
        }
    } catch (err) {
        console.log(err)
        res.json({ status: false, message: "Something Wrong" })
    }
}

const login = async (req, res) => {
    const { email, password, language } = req.body;

    try {
        const user = await userModel.findOne({ Email: req.body.email });
        if (!user || user.Password !== password) {
            // console.log(user.Password)
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        user.language = language;
        await user.save();

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const sendOtp = async (req, res) => {
    const { phoneNo, email } = req.body;
    try {
        const user = await userModel.findOne({ Email: email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        res.status(200).json({ message: otp });
        res.send(otp)
        user.otp = otp;
        await user.save();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};


const verifyOtp = async (req, res) => {
    const { phoneNo, email, otp, designation } = req.body;

    try {
        const user = await userModel.findOne({ Email: req.body.email });
        if (!user || user.otp !== otp) {
            return res.status(401).json({ message: 'Invalid otp' });
        }

        user.Designation = designation;
        user.Phone_no = phoneNo
        await user.save();

        res.status(200).json({ message: 'Verify successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    userRegister,
    login,
    sendOtp,
    verifyOtp
}