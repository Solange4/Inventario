export default function BadUrl(req, res) {
  return res.status(404).json({
    ok: false,
    message: 'WTF!!?? te webiaste en la URL',
    url: req.url,
  });
}
