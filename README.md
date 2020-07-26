# NLP ID
NLP ID adalah Neuro-Linguistic Programing untuk teks berbahasa indonesia

## Cara Penggunaan
### Menggunakan sebagai pustaka 
- script ID: 1SUhB_9Krn8oDPBGp3pG1M-s4CjQK0FMzvMSoVia29e1LdqW8C9EjUDSZ
- var foo = new TitoNlp.Nlp('pelarian perssmaan pertemuan perkumpulan bertemu memakan makan mempertemukan memperbarui makron buku menyelisihi mengelabui memakan mengesampingkan');
- Logger.log(foo.words);
### Menggunakan bukan sebagai pustaka
- Salin semua code
- buat foo = new Nlp('pelarian perssmaan pertemuan perkumpulan bertemu memakan makan mempertemukan memperbarui makron buku menyelisihi mengelabui memakan mengesampingkan');
## hasil yang diperoleh
- Hasil yang diperoleh berupa array dari json dengan 3 komponen yaitu o: kata sebelum stemming, t: jenis kata (r:kata dasar, s: stop word, d: kata jadian, u: tidak diketahui), dan b : kata setelah stemming
