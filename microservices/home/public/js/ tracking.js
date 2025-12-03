function createElementGoogleTagAds(id) {
  if (!id) return
  for (const element of id) {
    if (!element || document.getElementById(element)) return
    const script = document.createElement("script")
    script.setAttribute("id", element)
    script.setAttribute("async", "")
    script.setAttribute("src", `https://www.googletagmanager.com/gtag/js?id=${element}`)
    document.head.insertAdjacentElement("afterbegin", script)
  }
}

function addCssElement (element, style) {
  for (const ELEMENT_PROPERTY in style) element.style[ELEMENT_PROPERTY] = style[ELEMENT_PROPERTY]
}

function togglePublicyAcceptCookie (input) {
  window.dataLayer = window.dataLayer || []
  if (!input) return
  // createElementGoogleTagAds([])
}

function changeButtonStyle () {
  const TEXTO_DE_TERMOS_DE_COOKIES = document.getElementById("texto-de-termos-de-cookies")
  addCssElement(TEXTO_DE_TERMOS_DE_COOKIES, {
    "display": "none",
  })
  const TERMOS_DE_COOKIES_ACEITO = document.getElementById("termos-de-cookies-aceito")
  addCssElement(TERMOS_DE_COOKIES_ACEITO, {
    "display": "flex",
  })
  const TRACKING_SCRIPT = document.getElementById("tracking_script")
  addCssElement(TRACKING_SCRIPT, {
    "position": "fixed",
    "z-index": "10000011",
    "bottom": "10px",
    "right": "0px",
    "background-color": "transparent",
    "color": "#f5f5f5",
    "height": "30px",
    "width": "30px",
    "font-family": "'Roboto', arial, sans-serif",
  })
}

function createElementTrakingBar () {
  if (document.getElementById("tracking_script")) document.getElementById("tracking_script").remove()
  const TRACKING_SCRIPT = document.createElement("div")
  TRACKING_SCRIPT.id = "tracking_script"
  TRACKING_SCRIPT.innerHTML = `
  <div style="width:100vw;height:100vh;background-color:transparent">
    <div id="texto-de-termos-de-cookies"style="position:absolute;bottom:0;background-color:#111111;width:100%;display:flex;flex:1 1 auto;flex-wrap:wrap;align-items:center;justify-content:center;padding:45px 0 45px 15px">
      <div style="flex-basis:100%;flex-grow:0;max-width:100%;min-height:40px;flex:1 1 auto">
        <p style="position:relative;top:10px;text-align:center;font-size:16px;display:none">
          Este site armazena cookies para coletar informações e melhorar sua experiência de navegação.
          <span id="revisar-cookie"style="cursor:pointer;font-weight:bold;color:#5f646d;text-decoration:underline">Gerencie seus cookies</span> ou consulte <a href="/politica-de-privacidade"target="_blank"rel="noopener"style="font-weight:bold;color:#5f646d;text-decoration:underline">nossa política</a>.
        </p>
        <p style="position:relative;top:10px;text-align:left;font-size:16px">
          Este site armazena cookies para coletar informações e melhorar sua experiência de navegação.<br>
          Ao continuar navegando, você autoriza o tratamento dos seus dados pessoais, conforme especificado em nossa política de privacidade.<br><br>
          <a href=""target="_blank"rel="noopener"style="font-weight:bold;color:#ffffff;text-decoration:underline">Política de privacidade</a><br><br>
          <a href=""target="_blank"rel="noopener"style="font-weight:bold;color:#ffffff;text-decoration:underline">Política de cookies</a>
        </p>
      </div>
      <div style="flex-basis:30%;flex-grow:0;max-width:300px;flex:1 1 auto;padding-top:30px">
        <div id="concordo-com-os-termos-de-cookies"style="width:110px;height:40px;background-color:#f5f5f5;color:#000;padding:6px 16px;border-radius:8px;cursor:pointer;margin:auto">
          <p style="position:relative;top:5px;text-align:center;font-weight:bold;">Concordar</p>
        </div>
      </div>
    </div>
    <div id="termos-de-cookies-aceito"style="display:none">
      <a href=""rel="noopener"target="_blank"style="text-decoration:none">
        <div style="width:30px;height:30px;background-color:var(--v-primary-base);color:#f5f5f5;padding:0 5px;border-radius:50px 0 0 50px"title="Eu concordei com os termos de Cookies.\nEste site utiliza Plugins de Terceiros que criam Cookies para medir o desempenho da página.">
          <p style="position:relative;top:50%;transform:translateY(-50%);text-align:center;font-size:10px">
            ✔
          </p>
        </div>
      </a>
    </div>
  </div>
  `
  addCssElement(TRACKING_SCRIPT, {
    "position": "fixed",
    "z-index": "10000011",
    "bottom": "0",
    "background-color": "transparent",
    "color": "#f5f5f5",
    "width": "100vw",
    "font-family": "'Roboto', arial, sans-serif",
  })
  document.body.appendChild(TRACKING_SCRIPT)
}

document.addEventListener("DOMContentLoaded", () => {
  function emitCookieAcceptEvent () {
    window.dispatchEvent(new CustomEvent("concordo-com-os-termos-de-cookies", {
      detail: {
        localStorage: localStorage.getItem("concordo-com-os-termos-de-cookies"),
      },
    }))
  }
  const aceito = localStorage.getItem("concordo-com-os-termos-de-cookies") === "aceito"
  togglePublicyAcceptCookie(aceito)
  if (aceito) {
    emitCookieAcceptEvent()
    return
  }
  createElementTrakingBar()
  const cookiesElementButton = document.getElementById("concordo-com-os-termos-de-cookies")
  const oldMousedown = cookiesElementButton.onmousedown
  cookiesElementButton.onmousedown = () => {
    window.localStorage.setItem("concordo-com-os-termos-de-cookies", "aceito")
    emitCookieAcceptEvent()
    changeButtonStyle()
    togglePublicyAcceptCookie(true)
    if (oldMousedown) oldMousedown()
  }
}, false)
