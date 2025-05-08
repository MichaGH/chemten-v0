

//! Get Login Page
const getLoginPage = async (req, res) => {
    res.render('admin/pages/login', { error: null });
}

//! Submit Login Form
const submitLogin = async (req, res) => {
    const { username, password } = req.body;

    if (
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD
      ) {
        req.session.isAdmin = true;
        return res.redirect('/admin');
      } else {
        return res.render('admin/pages/login', { error: 'Invalid credentials' });
      }
}


//! Get Admin Dashboard
const getAdminDashboard = async (req, res) => {
    res.render('admin/pages/dashboard', { title: 'Admin Dashboard' });
}

//! Logout Admin
const adminLogout = async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/admin/login');
    });
}


module.exports = {
    getLoginPage,
    submitLogin,
    getAdminDashboard,
    adminLogout
}