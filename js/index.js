$(document).ready(()=>{
    $('#searchUser').on('keyup',(e)=>{
        let username=e.target.value;
        
        //make request to github
        $.ajax({
            url:'https://api.github.com/users/'+username,
            data:{
                client_id:'62f5d59195f2ed2df5af',
                client_secret:'693535548461d1557643dbaba9869af47cc9da9f'
            }
        }).done((user)=>{

            $.ajax({
                url:'https://api.github.com/users/'+username+'/repos',
                data:{
                    client_id:'62f5d59195f2ed2df5af',
                    client_secret:'693535548461d1557643dbaba9869af47cc9da9f',
                    sort:'created: asc',
                    per_page:5
                }
            }).done((repos)=>{
                $.each(repos,(index,repo)=>{
                    $('#repos').append(`
                        <div class="card mb-2">
                            <div class="row card-body">
                                <div class="col-md-7 ">
                                    <strong>${repo.name}</strong>
                                     <p class="text-muted">${repo.description}</p>
                                </div>
                                <div class="col-md-3">
                                    <span class="badge badge-danger">Forks: ${repo.forks_count}</span>
                                    <span class="badge badge-success">Watchers: ${repo.watchers_count}</span>
                                    <span class="badge badge-warning">Stars: ${repo.stargazers_count}</span>
                                </div>
                                <div class="col-md-2">
                                    <a class="btn btn-dark" href="${repo.html_url}" target="_blank">Repo Page</a>
                                </div>
                            </div>
                        </div>
                        
                    `);
                })
            });



            $('#profile').html(`
                <div class="card">
                    <div class="card-header">
                        ${user.name}
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-3">
                                <img src=${user.avatar_url} class="thumbnail avatar"/>
                                <a href=${user.html_url} target="_blank" class="btn btn-block btn-success">View Profile</a>
                            </div>
                            <div class="col-md-9">
                                <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
                                <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
                                <span class="badge badge-success">Followers: ${user.followers}</span>
                                <span class="badge badge-danger">Following: ${user.following}</span>
                                <br><br>
                                <ul class="list-group">
                                    <li class="list-group-item"><b>Company:</b> ${user.company}</li>
                                    <li class="list-group-item"><b>Location:</b> ${user.location}</li>
                                    <li class="list-group-item"><b>Website/blogs:</b> <a href=${user.blog} target="_blank">${user.blog}</a></li>
                                    <li class="list-group-item"><b>Member Since:</b> ${user.created_at}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div><br>
                <h3 class="page-header">Latest Repos</h3>
                <div id="repos"></div>
            `);
        })
    });
});