const switchPage = (currentPage) => {
    fetch('/courses/page/' + (1 + currentPage), {
        method : 'GET',
    })
        .then(result =>
            result.json()
        )
        .then(data=> {
            console.log(data)
        })
        .catch(err=>{
            console.log(err);
        })
};