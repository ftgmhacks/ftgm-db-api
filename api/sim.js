const axios = require('axios');

module.exports = async (req, res) => {
    const { num } = req.query;

    if (!num) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).send(JSON.stringify({
            ok: false,
            message: "Please provide a number (?num=300xxxxxxx or CNIC)"
        }, null, 2));
    }

    try {
        const response = await axios.get(`https://simsowner.pk/ajax-handler.php?number=${num}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
            }
        });
        
        let data = response.data;
        let records = [];

        if (Array.isArray(data)) {
            records = data;
        } else if (data && typeof data === 'object') {
            if (data.Name || data.CNIC || data.Mobile) {
                records = [data];
            }
        }

        const finalResponse = {
            status: "Success",
            owner: "FTGM HACKS",
            whatsapp: "https://wa.me/+923104882921",
            main: "https:ftgmtools.pages.dev",
            records: records
        };

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(finalResponse, null, 2));

    } catch (error) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        res.status(500).send(JSON.stringify({ 
            ok: false, 
            message: "Source API Error or Down" 
        }, null, 2));
    }
};
