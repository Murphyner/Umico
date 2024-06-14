import api from "../_services/api";

const actualTagsContain = document.getElementById('actual-tags-contain')

async function getActualTag(){
    let data = await api.getActualTags()
    data.tags.map(item => {
        actualTagsContain ? actualTagsContain.innerHTML += `<div class="bg-white px-3 py-1 text-[14px] rounded-md">${item.name}</div>` : ''
    })
}

export { getActualTag }