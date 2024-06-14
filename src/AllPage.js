import api from "../_services/api"

const navbarCategorySelect = document.getElementById('navbar-category-select')
const sidebar = document.getElementById('sidebar')
const navLeft = document.getElementById('nav-left')

/*------------------------Mehsul Kataloqu-----------------------*/

async function ShowNavCatList() {
    let data = await api.getData()
    let kod = ''
    data.data.map(item => {
        kod += `<li class="mb-3">
                    <a class="flex items-center" href="/category/?params=${item.slugged_name}">
                        <span>${item.name}</span>
                    </a>
                </li>`
    })
    navbarCategorySelect.innerHTML += `<div id="nav-cat-list" class="absolute lg:left-0 lg:right-auto lg:w-[150%] h-[300px] hidden overflow-y-auto bg-white top-[40px] z-[900] left-0 right-0">
        <ul class="text-black  py-4 px-4" >${kod}
        </ul>
    </div>`
}
ShowNavCatList()

/*------------------------Mehsul Kataloqu-----------------------*/

function SHowNAvCat() {
    const navCatList = document.getElementById('nav-cat-list')
    navCatList.classList.toggle('hidden')
}

export { SHowNAvCat }

/*------------------------Sidebar Show-----------------------*/

function ShowSide() {
    sidebar.classList.toggle('side-active')
}

export { ShowSide }

/*------------------------Soldaki menyu-----------------------*/

async function ShowNavLeft() {
    let data = await api.getData()
    data = data.data;

    data.map((item) => {
        navLeft ? navLeft.innerHTML += `<li id="list-${item.id}" class="mb-3 lists">
                                <div class="flex items-center justify-between">
                                    <a class="text-[#1e244d] text-[13px]" href="/category/?params=${item.slugged_name}">${item.name}</a>
                                </div>
                              </li>
                            ` : ''
    })
}

ShowNavLeft()