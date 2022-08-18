const content = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo est repudiandae nulla commodi maiores autem. Ipsum ratione quas repellat, iusto architecto doloribus laborum, culpa ex officiis obcaecati quam quisquam suscipit.";

const addContent = (persons = []) => {
    const ol = document.createElement('ol');
    persons.forEach(person => addPerson(person.first_name, person.last_name, ol));


    const span = document.createElement('span');
    span.textContent = content;
    
    const para = document.getElementById('content');
    // para.appendChild(span);
    para.appendChild(ol);


    // To remove from multiple click
    // const showBtn = document.getElementById('show-btn');
    // showBtn.removeEventListener('click', showContent);
};

const showContent = (event) => {
    const span = document.createElement('span');
    span.textContent = content;
    
    const para = document.getElementById('content');
    para.appendChild(span);


    // To remove from multiple click
    // const showBtn = document.getElementById('show-btn');
    // showBtn.removeEventListener('click', showContent);
};

const addPerson = (firstName, lastName, parent) => {
    const li = document.createElement('li');
    li.classList.add('person');
    li.textContent = `${firstName} ${lastName}`;
    parent.appendChild(li);
}

const fetchData = () => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function(response)  {
        if(this.status === 200 ) {
            const data = this.responseText;
            const persons = JSON.parse(data);
            addContent(persons);
        }
    });

    xhr.open('GET', 'data/person.json');
    xhr.send();
}

// load when document loaded
// document.addEventListener('load', {})
const showBtn = document.getElementById('show-btn');
// showBtn.addEventListener('click', showContent);

showBtn.addEventListener('click', fetchData);
