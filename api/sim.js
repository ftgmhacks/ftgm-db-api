const axios = require('axios');

module.exports = async (req, res) => {
    // 1. Headers se Referer aur Origin nikalna
    const referer = req.headers.referer || "";
    const origin = req.headers.origin || "";
    
    // Sirf aapki domain ko allow karna
    const allowedDomain = "ftgmdb.pages.dev";

    // Agar request aapki domain se NAHI hai, to block karo
    if (!referer.includes(allowedDomain) && !origin.includes(allowedDomain)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(403).send(JSON.stringify({
            ok: false,
            message: "Chutiya Detected!. We are Detect that you are a Chutiya Copy Paster so This Api is Not Working For You",
            owner: "FTGM TECH"
        }, null, 2));
    }

    const { num } = req.query;

    if (!num) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).send(JSON.stringify({
            ok: false,
            message: "Please provide a number (?num=300xxxxxxx)"
        }, null, 2));
    }

    try {
        const response = await axios.get(`https://bj-pak-sim-info.vercel.app/?num=${num}`);
        let data = response.data;

        // Purana creator remove karna
        if (data.creator) {
            delete data.creator;
        }

        // Aapka apna Credit aur Data
        const finalResponse = {
            status: "Success",
            owner: "FTGM TECH",
            whatsapp: "https://wa.me/+923104882921",
            telegram: "https://t.me/FTGMHACKS",
            ...data
        };

        // Output hamesha Pretty Format mein
        res.setHeader('Access-Control-Allow-Origin', `https://${allowedDomain}`);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(finalResponse, null, 2));

    } catch (error) {
        res.status(500).json({ ok: false, message: "Source API Error" });
    }
};
