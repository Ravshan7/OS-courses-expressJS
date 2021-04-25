function formaterCurrency(price) {
    return new Intl.NumberFormat('ru-RU', {
        currency: 'tjs',
        style: 'currency'
    }).format(price)
}

document.querySelectorAll('.price').forEach(el => {
    el.textContent = formaterCurrency(el.textContent)
})


const card = document.getElementById('card')

card.addEventListener('click', e => {
    if (e.target.classList.contains('js-delete-card')) {
        fetch(`/card/${e.target.dataset.id}`, {
            method: 'delete'
        }).then(res => res.json()).then(data => {
            const tbody = data.course.map(el => `
                <tr>
                    <td>${el.title}</td>
                    <td>${el.count}</td>
                    <td>
                        <button class="waves-effect waves-light btn-small js-delete-card" data-id="${el.id}">Удалить</button>
                    </td>
                </tr>
            `)

            if (data.course.length) {
                card.querySelector('tbody').innerHTML = tbody
                card.querySelector('.price').textContent = formaterCurrency(data.price)
            } else{
                card.innerHTML = `<p>Корзина пуст</p>`
            }
    
        })
    }
})