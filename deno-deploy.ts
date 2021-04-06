async function handleRequest(request) {
  const { pathname } = new URL(request.url)
  if (pathname === "/" || pathname === "/zh") {
    return index()
  } else if (pathname === "/README.md") {
    const data = await fetch(
      `https://raw.githubusercontent.com/ctripcorp/wean/master/doc.md`
    )
      .then((res) => res.text())
      .then((data) => data)
    return new Response(data, {
      status: 200,
      headers: {
        server: "denosr",
        "content-type": "text/plain",
      },
    })
  } else if (pathname[0] === "/") {
    const data = await fetch(
      `https://raw.githubusercontent.com/yisar/wean-doc/master/${pathname}`
    )
      .then((res) => res.text())
      .then((data) => data)
    return new Response(data, {
      status: 200,
      headers: {
        server: "denosr",
        "content-type": pathname.includes(".css")
          ? "text/css; charset=utf-8"
          : "text/plain",
      },
    })
  }
}

async function index() {
  const data = await fetch(
    `https://raw.githubusercontent.com/yisar/wean-doc/master/index.html`
  )
    .then((res) => res.text())
    .then((data) => data)
  return new Response(data, {
    headers: {
      "content-type": "text/html; charset=UTF-8",
    },
  })
}

addEventListener("fetch", (event: any) => {
  event.respondWith(handleRequest(event.request))
})
