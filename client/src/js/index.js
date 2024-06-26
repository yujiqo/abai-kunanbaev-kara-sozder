const url = "https://abaitany-kn-group.onrender.com";
const index = `
    <h2><em>Абай Кунанбаев (1845-1904)</em></h2>
    <p><em>Абай Кунанбаев – выдающийся мыслитель, ученый, композитор и великий поэт казахского народа. Он также был философом-гуманистом и мастером художественного слова. Родился он 10 августа 1845 года в Семипалатинской области, на склонах горы Шынгыстау, рядом с источником Каскабулак. Поначалу его звали Ибрагим, но судьба дала ему имя Абай по наречению его отца – Кунанбая, который видел во сне великого представителя племени тобыкты – мыслителя и философа Аннет баба, который произнес имя Ибрагимом.</em></p>
    <p><em>Бабушка Зере называла его Абаем, что переводится как "осмотрительный, осторожный, миленький". Это название прижилось к мальчику, и по сути, его больше никто и не называл своим настоящим именем.</em></p>
    <p><em>Абай родился в знатном и богатом роду биев и аристократов. Его прадед Ыргызбай был батыром и бием рода тобыкты. Термин "батыр" нес в себе не только силу и мужество, но и участие в боевых действиях. Ыргызбай был племянником известного Жанибека батыра из племени керей, который за заслуги в боях с джунгарскими войсками получил благословение от самого Абылай хана.</em></p>
    <p><em>Роль Кунанбая как важной фигуры в жизни Абая неоценима. Он внушил ему ценности, такие как человечность и целеустремленность. Жизнь и творчество Абая во многом определялись примерами и установками его отца.</em></p>
    <p><em>Вторым значимым именем в жизни поэта было имя его родной матери Улжан, которая была доброй и мудрой женщиной из богатого рода шаншар, происходившего из племени каракесек.</em></p>
    <p><em>Наибольшее влияние на раннее развитие Абая в искусстве слова оказала его бабушка Зере. Она была знатоком народной словесности и передала своему внуку любовь к знаниям и стремление к искусству. Зере, с ее добротой и чуткостью к окружающему миру, очень любила своего внука. Они проводили много времени вместе, и бабушка рассказывала ему сказки и истории, развивая его воображение.</em></p>
    <p><em>Благодаря бабушке и матери, Абай рано проявил интерес к поэзии и творчеству. Их влияние стало ключом к его поэтическому призванию и желанию бороться за человеческое счастье.</em></p>
`

const content = document.querySelector(".content");
const logo = document.querySelector(".logo");
const form = document.querySelector("form");


window.addEventListener("load", () => {
    const data = window.localStorage.getItem("current");

    if (data)
        content.innerHTML = data;
    else
        content.innerHTML = index;
});


logo.addEventListener("click", () => {
    if (window.localStorage.getItem("current")) {
        window.localStorage.removeItem("current");
    }

    content.innerHTML = index;
});


form.addEventListener("submit", async event => {
    event.preventDefault();

    window.localStorage.removeItem("current");

    const number = (new FormData(event.currentTarget)).get("number");
    let should_write = false;
    const data = await fetch(url + `/?word=${number}`).then(response => {
        if (response.status == 404)
            return '<div class="centered"><em>Ничего не найдено!</em></div>';

        should_write = true

        return response.json();
    })

    content.innerHTML = data;

    if (should_write)
        window.localStorage.setItem("current", data);

    event.target.reset();
});
