http://michaelandrews.typepad.com/the_technical_times/2009/10/creating-a-hashed-directory-structure.html

Pasos previos PT

Subir todas las imágenes originales a S3 en un nuevo bucket con el formato

/XX/XX/XX/XX/XX/XXXXXXXXX.(jpg|png)

donde XXXXXXXXX es el hash del id del padre de la imagen, por ejemplo: typeCode: 01(hotelMain)*

id: 100001

index: 1 (base 1)

hash: 123123123


ejemplo

/01/23/12/31/23/123123123.jpg


Pasos
Se hace una petición al servidor con el formato:

/wXXXhXXXt{typeCode}.identificador_{index}.formato

ejemplo:

/w300h200.01_0000100001_1.jpg

Se obtienen los datos de tamaño, nombre y formato y se obtiene la url del archivo en S3

obtiene el hash y binario de los datos de tamaño:

w300h200 ->tamaño

hash: 456456456

y el hash de ls datos de la imagen:

01 -> typeCode

100001 -> id

1 -> index

hash: 123123123

y se busca en el bucket

con el formato:

<bucketuri>//XX/XX/XX/XX/XX/XXXXXXXXXX.(jpg|gif)

ejemplo:

bucket.com/01/23/12/31/23/123123123.jpg


*tipos:
- 01 hotel**
- 02 roomgalleryItem
- 03 tour**
- 04 hotelgalleryItem
- 05 tourgalleryItem
- 06 ship**
- 08 shipgalleryItem
- 07 cabingalleryitem
- 08 destination**
- 09 destinationgalleryItem

**posiblemente se combine con el tipo gallery

3 niveles:

máximo 16,777,216 de carpetas con máximo 256 archivos cada una

máximo 4,294,967,296 archivos
