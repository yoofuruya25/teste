// Arrays de opções
const baseOptions = ["assets/base/skin1.png","assets/base/skin2.png"];
const hairOptions = ["assets/hair/hair1.png","assets/hair/hair2.png","assets/hair/hair3.png"];
const shirtOptions = ["assets/shirts/shirt1.png","assets/shirts/shirt2.png"];
const pantsOptions = ["assets/pants/pants1.png","assets/pants/pants2.png"];

// Índices atuais
let indices = { base:0, hair:0, shirt:0, pants:0 };

// Elementos
const imgBase = document.getElementById("imgBase");
const imgHair = document.getElementById("imgHair");
const imgShirt = document.getElementById("imgShirt");
const imgPants = document.getElementById("imgPants");

const previews = {
    base: document.getElementById("basePreview"),
    hair: document.getElementById("hairPreview"),
    shirt: document.getElementById("shirtPreview"),
    pants: document.getElementById("pantsPreview")
};

// Atualiza imagens
function updateImages(type){
    const optionArray = {base:baseOptions, hair:hairOptions, shirt:shirtOptions, pants:pantsOptions}[type];
    const index = indices[type];
    const src = optionArray[index];
    previews[type].src = src;
    ({base:imgBase, hair:imgHair, shirt:imgShirt, pants:imgPants}[type].src = src);
}

// Botões de seta
document.querySelectorAll(".prevBtn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
        const type = btn.dataset.type;
        const optionArray = {base:baseOptions, hair:hairOptions, shirt:shirtOptions, pants:pantsOptions}[type];
        indices[type] = (indices[type]-1+optionArray.length)%optionArray.length;
        updateImages(type);
    });
});

document.querySelectorAll(".nextBtn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
        const type = btn.dataset.type;
        const optionArray = {base:baseOptions, hair:hairOptions, shirt:shirtOptions, pants:pantsOptions}[type];
        indices[type] = (indices[type]+1)%optionArray.length;
        updateImages(type);
    });
});

// Download do personagem
const downloadBtn = document.getElementById("downloadBtn");
const container = document.getElementById("characterContainer");

downloadBtn.addEventListener("click", ()=>{
    const canvas = document.createElement("canvas");
    canvas.width = 192;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");

    [imgBase, imgPants, imgShirt, imgHair].forEach(img=>{
        try{ ctx.drawImage(img,0,0,canvas.width,canvas.height); }
        catch(e){ console.warn("Imagem não carregada:", img.src);}
    });

    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "personagem.png";
    link.click();
});

// Preenche campos ocultos antes do submit
const saveForm = document.getElementById("saveForm");
saveForm.addEventListener("submit", ()=>{
    document.getElementById("formSkin").value = baseOptions[indices.base];
    document.getElementById("formHair").value = hairOptions[indices.hair];
    document.getElementById("formShirt").value = shirtOptions[indices.shirt];
    document.getElementById("formPants").value = pantsOptions[indices.pants];
});

const textareas = document.querySelectorAll('textarea');

textareas.forEach(textarea => {
    textarea.addEventListener('input', () => {
        textarea.style.height = 'auto';          // reseta a altura
        textarea.style.height = textarea.scrollHeight + 'px'; // ajusta à altura do conteúdo
    });
});

let lastScroll = 0;
const menu = document.getElementById("topMenu");

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 50) {
        menu.classList.add("hidden");   // some ao descer
    } else {
        menu.classList.remove("hidden"); // aparece ao subir
    }

    lastScroll = currentScroll;
});