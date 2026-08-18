const fs = require('fs');
const path = require('path');
const dir = 'e:/Quotation App/mobile/assets';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));
for (const file of files) {
  const p = path.join(dir, file);
  const buf = fs.readFileSync(p);
  const isPng = buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47;
  const isJpg = buf[0] === 0xFF && buf[1] === 0xD8 && buf[2] === 0xFF;
  console.log(file + ': isPng=' + isPng + ', isJpg=' + isJpg + ', size=' + buf.length);
}
