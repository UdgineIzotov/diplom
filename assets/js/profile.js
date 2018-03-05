window.onload = function() {
    const nameBtn = document.querySelector('#add-subject-btn');
    const subjectBtn = document.querySelector('#add-subject-btn');
    const graduatedBtn = document.querySelector('#add-graduated-btn');
    const degreeBtn = document.querySelector('#add-degree-btn');

    const graduatedModal = `
    <tr>
        <td>
            <label for="name">Название :</label>
        </td>
        <td>
            <input type="text" id="name">
        </td>
    </tr>
    <tr>
        <td>
            <label for="graduationYear">Год выпуска :</label>
        </td>
        <td>
            <input type="text" id="graduationYear">
        </td>
    </tr>
    <tr>
        <td>
            <label for="speciality">Специальность :</label>
        </td>
        <td>
            <input type="text" id="speciality">
        </td>
    </tr>
    <tr>
        <td>
            <label for="qualification">Специальность :</label>
        </td>
        <td>
            <input type="text" id="qualification">
        </td>
    </tr>
    <tr>
        <td>
            <label for="scan">Скан :</label>
        </td>
        <td>
            <input type="file" id="scan">
        </td>
    </tr>
    `;
    
    graduatedBtn.addEventListener('click', (e) => {
        openModal(graduatedModal, (e) => {
            e.preventDefault();

            const inputs = Array.from(e.target.querySelectorAll('input'));

            let newItem = {};

            inputs.forEach( item => {
                newItem[item.id] =  item.value;
            })

            

        }); 
    })
}

function openModal(modal, callback) {
    const modalContainer = document.querySelector('.modal-container');

    const modalHtml = `
        <div class="modal-wrapper">
            <div class="modal-body">
                <form class="modal-form">
                    <div class="modal-form-header">
                        Modal
                    </div>
                    <table class="modal-form-body">
                        ${modal}
                        <tr>
                            <td class="modal-form-actions-submit">
                                <button class="modal-form-submit-btn" id="form-submit">
                                    Оk
                                </button>
                            </td>
                            <td class="modal-form-actions-cancel">
                                <button class="modal-form-cancel-btn" id="form-cancel">
                                    Отмена
                                </button>
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
        </div>
    `

    modalContainer.innerHTML = modalHtml;

    const modalCancel = document.querySelector("#form-cancel");
    modalCancel.addEventListener('click', closeModal);   

    const modalSubmit = document.querySelector('.modal-form');
    modalSubmit.addEventListener('submit', callback);
}

function closeModal() {
    document.querySelector('.modal-container').innerHTML ='';
}

