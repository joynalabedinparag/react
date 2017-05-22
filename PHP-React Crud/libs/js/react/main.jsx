
var CreatePostComponent = React.createClass({
    getInitialState: function() {
        return {
            authors: [],
            selectedAuthorId: -1,
            title: '',
            description: '',
            author: '',
            successCreation: null, 
			message: '',
        };
    },
    componentDidMount: function() {
        this.serverRequest = $.get("api/read_all_authors.php", function (authors) {
            this.setState({
                authors: JSON.parse(authors)
            });
        }.bind(this));

        $('.page-header h1').text('Create Post');
    },
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },
    // handle author change
    onAuthorChange: function(e) {
        this.setState({selectedAuthorId: e.target.value});
    },

    // handle title change
    onTitleChange: function(e) {
        this.setState({title: e.target.value});
    },
    // handle description change
    onDescriptionChange: function(e) {
        this.setState({description: e.target.value});
    },
    onSave: function(e) {
		if(this.state.title !=='' && this.state.description !=='' &&
			this.state.selectedAuthorId !==-1 ) {
			$.post("api/create_post.php", {
					title: this.state.title,
					description: this.state.description,
					price: this.state.price,
					author_id: this.state.selectedAuthorId
				},
				function(res) {
					this.setState({successCreation: res});
					this.setState({title: ""});
					this.setState({description: ""});
					this.setState({selectedAuthorId: -1});
				}.bind(this)
			);
		} else {
			this.setState({successCreation: false});
			this.setState({message: "Please Out All Mendatory Fields"});
		}
        e.preventDefault();
    },
    render: function() {

        // make authors as option for the select tag.
        var AuthorsOptions = this.state.authors.map(function(author) {
            return (
                <option key={author.id} value={author.id}>{author.name}</option>
            );
        });
		
        return (
            <div>
                {
                    this.state.successCreation == "true" ?
                        <div className='alert alert-success'>
                            Post was saved.
                        </div>
                        : null
                }
                {
                    this.state.successCreation == false ?
                        <div className='alert alert-danger'>
                            {this.state.message}
                        </div>
                        : null
                }
               	
				<a href='#'
                   onClick={() => this.props.changeAppMode('read')}
                   className='btn btn-primary margin-bottom-1em'> Read Posts
                </a>


                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>
                        <tr>
                            <td>Title <span className='required'> * </span></td>
                            <td>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={this.state.title}
                                    required
                                    onChange={this.onTitleChange} />
                            </td>
                        </tr>

                        <tr>
                            <td>Description <span className='required'> * </span></td>
                            <td>
								<textarea
									type='text'
									className='form-control'
									required
									value={this.state.description}
									onChange={this.onDescriptionChange}>
								</textarea>
                            </td>
                        </tr>

                        <tr>
                            <td>Author <span className='required'> * </span></td>
                            <td>
                                <select
                                    onChange={this.onAuthorChange}
                                    className='form-control'
                                    value={this.state.selectedAuthorIdId}>
                                    <option value="-1">Select Author...</option>
                                    {AuthorsOptions}
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td></td>
                            <td>
                                <button
                                    className='btn btn-primary'
                                    onClick={this.onSave}>Save</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
});

// component that renders a single post
var PostRow = React.createClass({
    render: function() {
        return (
            <tr>
                <td>{this.props.post.title}</td>
                <td>{(this.props.post.description.length>30) ? this.props.post.description.substring(0, 30)+"..." : this.props.post.description} </td>
                <td>{this.props.post.author_name}</td>
                <td>
                    <a href='#'
                       onClick={() => this.props.changeAppMode('readOne', this.props.post.id)}
                       className='btn btn-info m-r-1em'> Read
                    </a>
                    <a href='#'
                       onClick={() => this.props.changeAppMode('update', this.props.post.id)}
                       className='btn btn-primary m-r-1em'> Edit
                    </a>
                    <a
                        onClick={() => this.props.changeAppMode('delete', this.props.post.id)}
                        className='btn btn-danger'> Delete
                    </a>
                </td>
            </tr>
        );
    }
});

// component for the whole posts table
var PostTable = React.createClass({
    render: function() {

        var rows = this.props.posts
            .map(function(post, i) {
                return (
                    <PostRow
                        key={i}
                        post={post}
                        changeAppMode={this.props.changeAppMode} />
                );
            }.bind(this));

        return(
            !rows.length
                ? <div className='alert alert-danger empty-table'> No post found.</div>
                :
                <table id="datatable" className='table table-bordered table-hover'>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Author</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
        );
    }
});

// component that contains the functionalities that appear on top of
// the posts table: create post
var TopActionsComponent = React.createClass({
    render: function() {
        return (
            <div className="pull-left">
                <a href='#'
                   //onClick={() => this.props.changeAppMode('create')}
                   onClick={() => this.props.changeAppMode('create')}
                   className='btn btn-primary margin-bottom-1em'> Create Post
                </a>
            </div>
        );
    }
});

var TopActionsComponentSearch = React.createClass({
    render: function() {
        return (
            <div className="pull-right">
                <input type="text" className="pull-right form-control"/>
            </div>
        );
    }
});

// component that contains all the logic and other smaller components
// that form the Read Products view
var ReadPostComponent = React.createClass({
    getInitialState: function() {
        return {
            posts: []
        };
    },

    // on mount, fetch all posts and stored them as this component's state
    componentDidMount: function() {
        this.serverRequest = $.get("api/read_all_posts.php", function (posts) {
            this.setState({
                posts: JSON.parse(posts)
            });
        }.bind(this));
		
 		$('#datatable').dataTable();
    },
	componentDidUpdate: function(){
 		$('#datatable').dataTable({
		  "bAutoWidth": false,
		  "bDestroy": true,	
		});
 	},
    // on unmount, kill post fetching in case the request is still pending
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },
    // handle search change
    onSearchChange: function(e) {
        //this.setState({search: e.target.value});
    },

    render: function() {
        // list of posts
        var filteredPosts = this.state.posts;
        $('.page-header h1').text('Read Posts');

        return (
            <div className='overflow-hidden'>
                <TopActionsComponent changeAppMode={this.props.changeAppMode} />

                <PostTable posts={filteredPosts} changeAppMode={this.props.changeAppMode} />
            </div>
        );
    }
});

var ReadOnePostComponent = React.createClass({

    getInitialState: function() {
        // make sure that no other values are set
        return {
            id: 0,
            title: '',
            description: '',
            author: 0,
            date_created : '',
        };
    },

    // on mount, read one post based on given ID
    componentDidMount: function() {

        var postId = this.props.postId;

        this.serverRequestProd = $.post("api/read_one_post.php",
            {prod_id: postId},
            function (post) {
                var p = JSON.parse(post)[0];
                this.setState({id: p.id});
                this.setState({title: p.title});
                this.setState({description: p.description});
                this.setState({author: p.author_name});
                this.setState({date_created: p.date_created});
            }.bind(this));

        $('.page-header h1').text('Read Post');
    },

    // on unmount, kill fetching the post data in case the request is still pending
    componentWillUnmount: function() {
        this.serverRequestProd.abort();
    },

    // show single post data on a table
    render: function() {

        return (
            <div>
                <a href='#'
                   onClick={() => this.props.changeAppMode('read')}
                   className='btn btn-primary margin-bottom-1em'>
                    Read Products
                </a>

                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>
                        <tr>
                            <td>Title</td>
                            <td>{this.state.title}</td>
                        </tr>

                        <tr>
                            <td>Description</td>
                            <td>{this.state.description}</td>
                        </tr>

                        <tr>
                            <td>Author</td>
                            <td>{this.state.author}</td>
                        </tr>

                        <tr>
                            <td>Creation Date</td>
                            <td>{this.state.date_created}</td>
                        </tr>

                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
});

var UpdatePostComponent = React.createClass({
    getInitialState: function() {
        return {
            authors: [],
            selectedAuthorId: -1,
            id: 0,
            title: '',
            description: '',
            author: '',
            successUpdate: null,
            message: '',
        };
    },
    componentDidMount: function() {
        this.serverRequestCat = $.get("api/read_all_authors.php", function (authors) {
            this.setState({
                authors: JSON.parse(authors)
            });
        }.bind(this));

        var postId = this.props.postId;
        this.serverRequestProd = $.post("api/read_one_post.php",
            {prod_id: postId},
            function (post) {
                var p = JSON.parse(post)[0];
                if(p.author_id == 0 || p.author_id == null) {
                    p.author_id = -1;
                }
                this.setState({selectedAuthorId: p.author_id});
                this.setState({id: p.id});
                this.setState({title: p.title});
                this.setState({description: p.description});
                this.setState({author: p.author});
            }.bind(this));

        $('.page-header h1').text('Edit Post');
    },
    componentWillUnmount: function() {
        this.serverRequestCat.abort();
        this.serverRequestProd.abort();
    },
    // handle author change
    onAuthorChange: function(e) {
        this.setState({selectedAuthorId: e.target.value});
    },

    // handle title change
    onTitleChange: function(e) {
        this.setState({title: e.target.value});
    },

    // handle description change
    onDescriptionChange: function(e) {
        this.setState({description: e.target.value});
    },
    onSave: function(e) {
        console.log("author :" +this.state.selectedAuthorId);
        if(this.state.title !=='' && this.state.description !=='' && this.state.selectedAuthorId !==-1) {
            $.post("api/update_post.php", {
                    id: this.state.id,
                    title: this.state.title,
                    description: this.state.description,
                    author_id: this.state.selectedAuthorId
                },
                function(res){
                    this.setState({successUpdate: res});
                }.bind(this)
            );
        } else {
            this.setState({successUpdate: false});
            this.setState({message: "Please Out All Mendatory Fields"});
        }
        e.preventDefault();
    },
    render: function() {
        var authorsOptions = this.state.authors.map(function(author){
            return (
                <option key={author.id} value={author.id}>{author.name}</option>
            );
        });

        return (
            <div>
                {
                    this.state.successUpdate == "true" ?
                        <div className='alert alert-success'>
                            Post was updated.
                        </div>
                        : null
                }

                {
                    this.state.successUpdate == false ?
                        <div className='alert alert-danger'>
                        {this.state.message}
                        </div>
                        : null
                }

                <a href='#'
                   onClick={() => this.props.changeAppMode('read')}
                   className='btn btn-primary margin-bottom-1em'>
                    Read Products
                </a>

                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>
                        <tr>
                            <td>Title <span className='required'> * </span></td>
                            <td>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={this.state.title}
                                    required
                                    onChange={this.onTitleChange} />
                            </td>
                        </tr>

                        <tr>
                            <td>Description <span className='required'> * </span></td>
                            <td>
                            <textarea
                                type='text'
                                className='form-control'
                                required
                                value={this.state.description}
                                onChange={this.onDescriptionChange}></textarea>
                            </td>
                        </tr>

                        <tr>
                            <td>Author <span className='required'> * </span></td>
                            <td>
                                <select
                                    onChange={this.onAuthorChange}
                                    className='form-control'
                                    value={this.state.selectedAuthorId}>
                                    <option value={-1}>Select Author...</option>
                                    {authorsOptions}
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td></td>
                            <td>
                                <button
                                    className='btn btn-primary'
                                    onClick={this.onSave}>Save Changes</button>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
});

var DeletePostComponent = React.createClass({

    componentDidMount: function() {
        $('.page-header h1').text('Delete Post');
    },

    onDelete: function(e){
        var postId = this.props.postId;

        $.post("api/delete_post.php",
            { del_ids: [postId] },
            function(res){
                this.props.changeAppMode('read');
            }.bind(this)
        );
    },

    render: function() {

        return (
            <div className='row'>
                <div className='col-md-3'></div>
                <div className='col-md-6'>
                    <div className='panel panel-default'>
                        <div className='panel-body text-align-center'>Are you sure?</div>
                        <div className='panel-footer clearfix'>
                            <div className='text-align-center'>
                                <button onClick={this.onDelete}
                                        className='btn btn-danger m-r-1em'>Yes</button>
                                <button onClick={() => this.props.changeAppMode('read')}
                                        className='btn btn-primary'>No</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-3'></div>
            </div>
        );
    }
});

var MainApp = React.createClass({
    getInitialState: function() {
        return {
            currentMode: 'read',
            postId: null
        };
    },
    changeAppMode: function(newMode, postId){
        this.setState({currentMode: newMode});

        if(postId !== undefined){
            this.setState({postId: postId});
        }
    },
    render: function() {

        var modeComponent =
            <ReadPostComponent
                changeAppMode={this.changeAppMode} />;

        switch(this.state.currentMode) {
            case 'read':
                break;
            case 'readOne':
                modeComponent = <ReadOnePostComponent postId={this.state.postId} changeAppMode={this.changeAppMode}/>;
                break;
            case 'create':
                modeComponent = <CreatePostComponent changeAppMode={this.changeAppMode}/>;
                break;
            case 'update':
                modeComponent = <UpdatePostComponent postId={this.state.postId} changeAppMode={this.changeAppMode}/>;
                break;
            case 'delete':
                modeComponent = <DeletePostComponent postId={this.state.postId} changeAppMode={this.changeAppMode}/>;
                break;
            default:
                break;
        }

        return modeComponent;
    }
});

ReactDOM.render(
<MainApp />,
    document.getElementById('content')
);