# Informations importantes

1. Afin de pouvoir ajouter des filtres du type "rounded" ou "shadow" ou "circle" etc.
   Il faut ajouter "objectFit: 'cover'" à l'image.
   Et on lui donne un height et un width avec la propriété "vw". Exemple: 35vw de height et 35vw de width.
   Cela permets de respecter l'aspect-ratio de l'image en responsive et aussi de rajouter des effets
   car l'image sera toujours à la même taille que le container parent sur tous les appareils.

   Si l'image est coupée pour rentrer dans le container, il faut modifier le height et le width jusqu'à ce que
   l'image rentre bien.

2. Utiliser "objectFit: 'contain'" pour les images qui ne doivent pas être coupées et qui n'ont pas besoin d'effets
   du type bords arrondis ou ombre etc.
   Cette propritété permet de réduire automatiquement la taille de l'image afin qu'elle reste à l'intérieur
   du container parent. Elle ne coupe pas l'image, l'image apparaît entièrement et en respectant l'aspect ratio.

3. Ne pas utiliser drop-shadow. Il est buggué sur certains navigateurs mobile.

# Exemple basique

Il faut toujours donner une taille fixe Width et Height afin de pouvoir générer les placeholders.
On peut aussi utiliser les vw, vh et rem mais il faut saisir obligatoirement pour le width ET le height.

```jsx
<GhostImage
  containerClassName={
    "h-[50vw] w-[65vw] md:h-[35vw] md:w-[45vw] m-auto mb-10 xl:-mt-12 lg:flex lg:items-end order-first xl:order-last overflow-hidden rounded-xl shadow-2xl"
  }
  objectFit={"cover"}
  src={ThumbnailImg}
/>
```

# Les bords un peu arrondi (simple)

```jsx
<GhostImage
  containerClassName={"h-[50vw] w-[65vw] md:h-[35vw] md:w-[45vw] overflow-hidden rounded-xl shadow-2xl"}
  objectFit={"cover"}
  src={ThumbnailImg}
  priority={true}
/>
```

# Les bords complètement arrondis + entouré de bords de couleur (ring ou border) (avatar..)

Info importante: le width et le height doit être égale dans le parent et dans l'enfant !

```jsx
<GhostImage
  containerClassName={
    "h-[150px] w-[150px] sm:w-[10rem] sm:h-[10rem] rounded-full border-gray-200 border-2 shadow-md overflow-hidden"
  }
  src={imgPhone}
/>
```

# Les bords complètement arrondis + object fit cover

```jsx
<GhostImage
  containerClassName={
    "h-[150px] w-[150px] sm:w-[10rem] sm:h-[10rem] rounded-full border-gray-200 border-2 shadow-md overflow-hidden"
  }
  objectFit={"cover"}
  src={imgPhone}
/>
```
