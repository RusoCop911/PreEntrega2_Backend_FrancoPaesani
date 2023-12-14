import multer from 'multer'

export function configureMulter(app) {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './src/public')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname + '_' + new Date().getTime())
        },
    })

    const uploader = multer({ storage })

    app.post('/', uploader.single('file'), (req, res) => {
        if (!req.file) {
            console.log('No se ha enviado ningún archivo.')
            return res.status(500).send('¡No se ha enviado ningún archivo!')
        }

        console.log('Archivo recibido:', req.file)

        res.send('¡Archivo subido con éxito!')
    })
}
