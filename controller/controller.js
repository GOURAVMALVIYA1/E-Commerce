const con = require('../config/config');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loadRegister = async (req, res) => {
    try {
        await res.render('register')
    } catch (error) {
        console.log(error.message);
    }
};

const insertData = (req, res) => {

    bcrypt.genSalt(10, (err, salt) => {

        bcrypt.hash(req.body.upassword, salt, async (err, hash) => {
            try {
                const uname = await req.body.uname;
                const uemail = await req.body.uemail;
                const umobile = await req.body.umobile;
                const upassword = await hash;


                const sql = "INSERT INTO register(uname,uemail,umobile,upassword) VALUES(?,?,?,?)";
                con.query(sql, [uname, uemail, umobile, upassword], (error, result) => {
                    if (error) throw error;
                    // res.send("Registration Successfull" + "  " + result.insertId)
                    res.redirect('/list')
                })

            }
            catch (error) {
                console.log(error);
            }
        })

    })

}

const listData = (req, res) => {
    const sql = "SELECT * FROM `register`"
    con.query(sql, (error, result) => {
        if (error) console.log(error);
        res.render("userlist", { userlist: result })
    })

}

const selectData = (req, res) => {
    var id = req.query.id;
    const sql = "SELECT * FROM `register` where id=?"
    con.query(sql, [id], (error, result) => {
        if (error) console.log(error);
        res.render('updatelist', { userlist: result })
    })

}

const updateData = async (req, res) => {
    try {
        const uname = await req.body.uname;
        const uemail = await req.body.uemail;
        const umobile = await req.body.umobile;
        const id = await req.body.id;

        const sql = "UPDATE register SET uname=?,uemail=?,umobile=? WHERE id =?"
        con.query(sql, [uname, uemail, umobile, id], (error, result) => {
            if (error) console.log(error);
            res.redirect('/list')
        })
    } catch (error) {
        console.log(error);
    }

}

const deleteData = (req, res) => {
    var id = req.query.id;
    const sql = "delete from `register` where id=?"
    console.log(sql);
    con.query(sql, [id], (error, result) => {
        if (error)
            console.log(error)
        res.redirect('/list');

    })

}



// login start

const loginLoad = async (req, res) => {
    try {
        res.render('login')
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    try {
        const uemail = req.body.uemail;
        const upassword = req.body.upassword;
        console.log('password is', upassword);


        const sql = "SELECT * FROM `register` where uemail = ?"
        const search_query = con.format(sql, [uemail], [upassword]);

        con.query(search_query, async (err, result) => {
            if (err) throw (err)
            if (result.length == 0) {
                console.log("User does not exist")
                res.sendStatus(404);
            }
            else {
                const upassword1 = result[0].upassword;
                if (await bcrypt.compareSync(upassword, upassword1)) {
                    console.log("---------> Login Successful")
                    res.redirect('/home')
                }
                else {
                    console.log("---------> Password Incorrect")
                    res.send("Password incorrect!")
                }
            }
        })


    } catch (error) {
        console.log(error.message);
    }
}


const home = (req, res) => {
    res.render('home');
}

// for logout

const userLogout = async (req, res) => {
    try {
        req.session.destroy();
        res.redirect('/login');
    } catch (error) {
        console.log(error.message);
    }
}

// for category 

const loadcategory = async (req, res) => {
    try {
        await res.render('category')
    } catch (error) {
        console.log(error.message);
    }
};


const category = async (req, res) => {
    try {
        const category = await req.body.cat_name;
        const subcategory = req.body.sub_name;
        const sql = "INSERT INTO `category`(`cat_name`) VALUES (?)"

        const data = await con.query(sql, [category], async (error, result) => {
            if (error) throw error;
            if (cid = result.insertId, cid > 0) {
                const sql2 = "INSERT INTO `sub_category`(`cid`,`sub_name`) VALUES (?,?)"
                con.query(sql2, [cid, subcategory], (error, result) => {
                    if (error) throw error;

                    if (sub_cid = result.insertId, sub_cid > 0) {
                        const name = req.body.pname;
                        const price = req.body.pprice;
                        const quantity = req.body.pquantity;
                        const discount = req.body.pdiscount;
                        const description = req.body.pdescription;

                        const sql3 = "INSERT INTO `product`(`pname`,`pprice`,`pquantity`,`pdiscount`,`pdescription`,`cid`,`sub_cid`) VALUES (?,?,?,?,?,?,?)"
                        con.query(sql3, [name, price, quantity, discount, description, cid, sub_cid], (error, result) => {
                            if (error) throw error

                        })
                    }

                })
            }
            res.redirect('/productdetails')

        })
    }

    catch (error) {
        console.log(error);
    }
}


const productdetail = async(req, res) => {
   try {   
     con.query("SELECT * FROM `product`", (error, result) => {
          if(error) console.log(error)
          res.render("productdetails", { product:result })
   })
   } catch (error) {
       console.log(error);
   }
}

const searchProduct = async(req,res)=>{
    try {  
           const id = req.query.id;
           const cid = req.query.cid;
           const sub_cid = req.query.sub_cid;

           
        const sql = "SELECT * FROM `product` where id LIKE '%"+id+"%'AND cid LIKE '%"+cid+"%'AND sub_cid LIKE '%"+sub_cid+"%'";
        con.query(sql, [id, cid, sub_cid], (error, result) => {
            if (error) console.log(error);
            res.render("productdetails", { product:result })
        })
        
    } catch (error) {
        console.log(error);
    };
}

module.exports = {
    loadRegister, insertData, updateData, listData, selectData, deleteData, loginLoad, login, home, userLogout, loadcategory, category, productdetail,searchProduct

};
