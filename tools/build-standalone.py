#!/usr/bin/env python3
"""Bundle everything into ONE html file (dist/cyberkids-standalone.html) for easy sharing."""
import base64,re,pathlib
root=pathlib.Path(__file__).resolve().parent.parent
h=(root/'index.html').read_text(encoding='utf-8')
css=(root/'css/styles.css').read_text(encoding='utf-8')
logo='data:image/jpeg;base64,'+base64.b64encode((root/'assets/logo.jpeg').read_bytes()).decode()
h=h.replace('<link rel="stylesheet" href="css/styles.css">','<style>'+css+'</style>')
h=re.sub(r'<link rel="(icon|apple-touch-icon|manifest)"[^>]*>\n?','',h)
def js(m):return '<script>'+(root/m.group(1)).read_text(encoding='utf-8').replace('</script>','<\\/script>')+'</script>'
h=re.sub(r'<script src="(js/[^"]+)"></script>',js,h)
h=h.replace('assets/logo.jpeg',logo)
js_logo=logo
out=root/'dist';out.mkdir(exist_ok=True)
(out/'cyberkids-standalone.html').write_text(h.replace("'serviceWorker' in navigator","false"),encoding='utf-8')
print('wrote',out/'cyberkids-standalone.html',len(h)//1024,'KB')
