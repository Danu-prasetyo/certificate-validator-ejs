const fs = require("fs");
const path = require("path");
const qrCode = require("qrcode");

const filePathstudentData = path.join(__dirname, "../../studentData.json");
const filePathqrCode = path.join(__dirname, "../../qrCode.json");

const studentData = fs.readFileSync(filePathstudentData, "utf-8");
const qrCodeImage = fs.readFileSync(filePathqrCode, "utf-8");

exports.getCertificateById = (req, res) => {
  try {
    const key = req.params.id;
    const data = JSON.parse(studentData);

    const objectByKey = data.find((obj) => obj.Key === key);

    // res.send({ data: objectByKey });
    res.render("pages/", {
      data: objectByKey,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// exports.getCertificates = (req, res) => {
//   const data = JSON.parse(jsonData);
//   res.send({ data });
// };

exports.getQrCode = async (req, res) => {
  try {
    const dataJson = JSON.parse(qrCodeImage);

    const promises = dataJson.map((item) => {
      const link = `${req.protocol}://${req.hostname}:${req.app.get(
        "port"
      )}/verify/${item.Key}`;

      return new Promise((resolve, reject) => {
        qrCode.toDataURL(link, (err, qrCodeData) => {
          if (err) {
            reject(err);
            return;
          }

          const dataResponse = {
            nama: item.Nama,
            qrCode: qrCodeData,
          };

          resolve(dataResponse);
        });
      });
    });

    const data = await Promise.all(promises);
    res.render("pages/", {
      data: data,
    });
    console.log(data);
    // res.send({ data });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
