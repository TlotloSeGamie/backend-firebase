const { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } = require("firebase/firestore");
const { db } = require("../config/firebase");

const addEmployee = async (req, res) => {
  const { role, names, idNumber, address, contact, email } = req.body;

  try {
    const docRef = await addDoc(collection(db, "employee"), {
      role: role,
      names,
      idNumber: idNumber,
      address: address,
      contact: contact,
      email: email
    });

    res.json({
      message: "Addedd successfully",
    });
  } catch (error) {
    console.log(" adding Employee errror"  , error)
  }
};

const getEmployees = async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, "employee"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json({
      data: data
    });
  } catch (error) {
    console.log("Error in getting employee", error);
  }};


  const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employeeDocRef = doc(db, "employee", id);
    await deleteDoc(employeeDocRef);
    res.json({
      message: "Employee successfully deleted",
    });
  } catch (error) {
    console.log("Error in deleting employee", error);
    res.status(500).json({ error: "Failed to delete employee" });
  }
};

  
const updateEmployee = async (req, res) => {
  try {
      const { id } = req.params;
      const { role, names, gender, idNumber, address, suburb, city, zip, contact, email } = req.body;

      console.log("req.params:", req.params);
      console.log("req.body:", req.body);

      if (!role || !names || !gender || !idNumber || !address || !suburb || !city || !zip || !contact || !email) {
          return res.status(400).json({ message: "All fields are required" });
      }

      const employeeDocRef = doc(db, "employee", id);

      await updateDoc(employeeDocRef, {
          role,
          names,
          gender,
          idNumber,
          address,
          suburb,
          city,
          zip,
          contact,
          email,
      });

      res.json({
          message: "Employee successfully updated",
      });
  } catch (error) {
      console.error("Error in updating employee:", error.message);
      res.status(500).json({ error: "Failed to update employee" });
  }
};



module.exports  = {
    addEmployee,
    getEmployees,
    deleteEmployee,
    updateEmployee
}

