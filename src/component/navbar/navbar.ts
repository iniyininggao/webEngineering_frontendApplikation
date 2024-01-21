import './navbar.style.css'

/* document.querySelector<HTMLDivElement>('#nav')!.innerHTML = `
  <div>
    <nav>
        <h1><a href="#" >Omniverse Heroes</a></h1>
        <a href="#">Homepage</a>
        <a href="#">PK</a>
    </nav>
  </div>
`
 */


const routes: Record<string, string> = {
  'home': '/homepage/home.html',
  'about': '/about/about.html',
  'pkpage': '/pkpage/pkpage.html'
};

function loadPage(pageName: string) {
  
}