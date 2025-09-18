// EX - Il compleanno dello Chef

// In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id). Questa funzione accetta un id di una ricetta e deve:
// Recuperare la ricetta da https://dummyjson.com/recipes/{id}
// Estrarre la proprietà userId dalla ricetta
// Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
// Restituire la data di nascita dello chef

// Note del docente

// Scrivi la funzione getChefBirthday(id), che deve:
// Essere asincrona (async).
// Utilizzare await per chiamare le API.
// Restituire una Promise con la data di nascita dello chef.
// Gestire gli errori con try/catch

// Esempio di utilizzo
// getChefBirthday(1)
//   .then(birthday => console.log("Data di nascita dello chef:", birthday))
//   .catch(error => console.error("Errore:", error.message));

// Esempio di output atteso
// Data di nascita dello chef: 1990-06-15

// SOLUZIONE

// async function getChefBirthday(id) {
//   const responseRecipe = await fetch(`https://dummyjson.com/recipes/${id}`);
//   const resolveRecipe = await responseRecipe.json();
//   console.log(resolveRecipe);

//   const userId = resolveRecipe.userId;
//   const responseUser = await fetch(`https://dummyjson.com/users/${userId}`);
//   const resolveUser = await responseUser.json();
//   console.log(resolveUser);

//   birthday = resolveUser.birthDate;
//   return birthday;
// }
// (async () => {
//   try {
//     const birthday = getChefBirthday(1);
//     console.log("Data di nascita dello chef:", birthday);
//   } catch (error) {
//     console.error("Errore:", error.messagge);
//   }
// })();

// 🎯 Bonus 1
// Attualmente, se la prima richiesta non trova una ricetta,
// la seconda richiesta potrebbe comunque essere eseguita causando errori a cascata.

// Modifica getChefBirthday(id) per intercettare eventuali errori prima di fare la seconda richiesta.

// SOLUZIONE

// async function getChefBirthday(id) {
//   let recipe;
//   try {
//     const responseRecipe = await fetch(`https://dummyjson.com/recipes/${id}`);
//     recipe = await responseRecipe.json();
//     console.log(recipe);
//   } catch (error) {
//     console.error(error);
//     throw new Error(`Non riesco a recuperare la ricetta con id numero: ${id}`);
//   }
//   if (recipe.messagge) {
//     throw new Error("Ricetta con id:", id, "non trovata!");
//   }
//   const userId = recipe.userId;
//   let chef;

//   try {
//     const responseUser = await fetch(`https://dummyjson.com/users/${userId}`);
//     chef = await responseUser.json();
//     console.log(chef);
//   } catch (error) {
//     console.error(error);
//     throw new Error(
//       "Non riesco a recuperare lo chef con id numero:",
//       chef.messagge
//     );
//   }
//   if (chef.messagge) {
//     throw new Error("Non ho recuperato lo chef con id= ", userId);
//   }

//   birthday = chef.birthDate;

//   return birthday;
// }

// (async () => {
//   try {
//     const birthday = await getChefBirthday(1);

//     console.log("Data di nascita dello chef:", birthday);
//   } catch (error) {
//     console.error("Errore:", error.messagge);
//   }
// })();

// 🎯 Bonus 2

// Utilizza la libreria dayjs per formattare la data di nascita nel formato giorno/mese/anno.

// Esempio di output atteso con formattazione
// Data di nascita dello chef: 15/06/1990

async function getChefBirthday(id) {
  let recipe;
  try {
    const responseRecipe = await fetch(`https://dummyjson.com/recipes/${id}`);
    recipe = await responseRecipe.json();
    console.log(recipe);
  } catch (error) {
    console.error("ERRORE!", error.messagge);
    throw new Error(
      "Presente Errore! Non riesco a recuperare l'id numero: ",
      id
    );
  }
  if (recipe.messagge) {
    throw new Error("Presente Errore!", recipe.messagge);
  }
  const userId = recipe.userId;
  let chef;
  try {
    const responseChef = await fetch(`https://dummyjson.com/users/${userId}`);
    chef = await responseChef.json();
    console.log(chef);
  } catch (error) {
    console.error("ERRORE!", error.messagge);
    throw new Error("Presente Errore!", chef.messagge);
  }
  if (chef.messagge) {
    throw new Error(
      "Presente Errore! Non ho recuperato lo chef con id= ",
      userId
    );
  }

  const birthday = dayjs(chef.birthDate);
  const birthdayFormat = birthday.format(`DD/MM/YYYY`);

  // const birthdayFormat = birthday.format(DD / MM / YYYY);

  // console.log(birthdayFormat);
  return birthdayFormat;
}

(async () => {
  try {
    const birthday = await getChefBirthday(1);
    console.log("La data di nascità dello chef selezionato:", birthday);
  } catch (error) {
    console.error("Errore:", error.messagge);
  }
})();
