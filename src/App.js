import "./App.css";
import contacts from "./contacts.json";
import { useState } from "react";

function App() {
  const firstContacts = contacts.splice(0, 5);

  // Estado
  const [actualArr, setActualizarActualArr] = useState(firstContacts);

  // Funciones
  const addRandomContact = () => {
    const randomActor = contacts[Math.floor(Math.random() * contacts.length)];

    if (actualArr.length === contacts.length) {
      return;
    }

    // Para comprobar que no se repitan
    let newActorName = randomActor.name;
    let isActorRepeated = false;
    actualArr.forEach((eachActor) => {
      if (eachActor.name === newActorName) {
        isActorRepeated = true;
      }
    });

    if (isActorRepeated === true) {
      addRandomContact();
      return;
    }

    const cloneArr = [...actualArr];
    cloneArr.push(randomActor);

    setActualizarActualArr(cloneArr);
  };

  const sortByName = () => {
    const cloneArr = [...actualArr];

    const sortArr = cloneArr.sort(function (a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    setActualizarActualArr(sortArr);
  };

  const sortByPopularity = () => {
    const cloneArr = [...actualArr];

    const sortArr = cloneArr.sort(function (a, b) {
      return b.popularity - a.popularity;
    });

    setActualizarActualArr(sortArr);
  };

  const deleteContact = (contactName) => {
    console.log(contactName);

    const filteredArr = actualArr.filter((actor) => actor.name !== contactName);

    setActualizarActualArr(filteredArr);
  };

  return (
    <div className="App">
      <h1>Iron Contacts</h1>
      <button onClick={addRandomContact}>Add Random Contact</button>
      <button onClick={sortByName}>Sort by name</button>
      <button onClick={sortByPopularity}>Sort by popularity</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {actualArr.map((eachContact) => {
            return (
              <tr key={eachContact.name}>
                <td>
                  <img src={eachContact.pictureUrl} alt="" width="150px" />
                </td>
                <td>{eachContact.name}</td>
                <td>{eachContact.popularity}</td>
                {eachContact.wonOscar === true ? <td>🏆</td> : <td> </td>}
                {eachContact.wonEmmy === true ? <td>🏆</td> : <td> </td>}
                <td>
                  <button
                    onClick={() => {
                      deleteContact(eachContact.name);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
