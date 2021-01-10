import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';

const finalSpaceCharacters = [
  {
    id: '1',
    name: 'Homelessnes',
  },
  {
    id: '2',
    name: 'Racism',
  },
  {
    id: '3',
    name: 'Mental Illness',
  },
  {
    id: '4',
    name: 'Drug Use',
  },
  {
    id: '5',
    name: 'Roads',
  },
  {
    id: '6',
    name: 'Healthcare',
  },
  {
    id: '7',
    name: 'Climate Change',
  },
  {
    id: '8',
    name: 'Jobs',
  },
  {
    id: '9',
    name: 'Real Estate',
  },
  {
    id: '10',
    name: 'Taxes',
  }
]

function App() {
  const [characters, updateCharacters] = useState(finalSpaceCharacters);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    if (result.source.index !== result.destination.index) {
      items[result.destination.index].name = items[result.source.index].name + " | "+ items[result.destination.index].name;
      const [reorderedItem] = items.splice(result.source.index, 1);
    } else {
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
    }
    updateCharacters(items);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Topics</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <div className="container">
                <div>
                  <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                    {characters.map(({id, name}, index) => {
                      return (
                        <Draggable key={id} draggableId={id} index={index}>
                          {(provided) => (
                            <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <p>
                                { name }
                              </p>
                            </li>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </ul>
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </header>
    </div>
  );
}

export default App;