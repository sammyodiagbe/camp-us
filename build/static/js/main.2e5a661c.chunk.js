(this["webpackJsonpcamp-us-frontend"]=this["webpackJsonpcamp-us-frontend"]||[]).push([[0],{102:function(e,t,n){},132:function(e,t){},135:function(e,t,n){},136:function(e,t,n){},137:function(e,t,n){},138:function(e,t,n){},139:function(e,t,n){},140:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(34),o=n.n(r),i=n(5),s=n(3),l=n(6),u=n(7),m=n(8),p=n(10),d=n(24),h=n(4),f=n(18),v=n(2),E="http://localhost:5000/api/camp-us",g="".concat(E,"/auth/create-account"),b="".concat(E,"/auth/login"),y="".concat(E,"/auth/verify-authentication"),O="".concat(E,"/profile"),_="".concat(E,"/profile/check-connection"),S="".concat(E,"/profile/feeds/get-feeds"),j="".concat(E,"/says"),w="".concat(E,"/interaction/new-post"),N="".concat(E,"/interaction/new-comment"),C="".concat(E,"/interaction/post/like"),k="".concat(E,"/connections/follow"),I="".concat(E,"/connections/unfollow"),T="".concat(E,"/messaging/get-all-conversations"),A="".concat(E,"/messaging/get-active-conversation"),U="".concat(E,"/messaging/new-message"),F="".concat(E,"/people/search"),R="".concat(E,"/notifications/get-notifications"),P="".concat(E,"/interaction/getpost"),x=n(9),V=n.n(x),D=function(e){return{type:"IS_VERIFYING_AUTHENTICATION",payload:e}},G=function(e){return{type:"IS_LOGGING_IN",payload:e}},M=function(e){return{type:"IS_CREATING_ACCOUNT",payload:e}},L=function(e){return{type:"IS_GETTING_PROFILE_DETAILS",payload:e}},z=function(e){return{type:"IS_GETTING_SAYS",payload:e}},B=function(e){return{type:"IS_GETTING_SAY",payload:e}};n(56);var W=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).handleInputChange=function(e){var t=e.target,a=t.id,c=t.value,r=Object(v.a)({},n.state.input,Object(f.a)({},a,c));n.setState({input:r})},n.createUserAccount=function(e){e.preventDefault();var t=n.state.input,a=function(e){var t={},n={name:{message:"Name is required",isValid:function(e){return""!==e.trim()&&new RegExp("^(?=.[a-zA-Z])").test(e)}},email:{message:"Email field is required",isValid:function(e){return""!==e.trim()&&new RegExp("^[a-zA-Z0-9_.-]{2,}@[a-zA-Z0-9]{2,}.[a-zA-Z0-9]{2,}$").test(e)}},nickname:{message:"Nickname field is required",isValid:function(e){if(""===e.trim())return!1;return/^\w{1,}$/.test(e)}},password:{message:"Password field is required",isValid:function(e){return""!==e.trim()&&new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,30})").test(e)}},cpassword:{message:"Passwords do not match",isValid:function(t){return t===e.password}}};for(var a in e){var c=n[a],r=c.isValid(e[a]);t[a]=r?null:c.message}return t}(t),c=!1;for(var r in a)a[r]&&(c=!0);if(c)console.log(a),console.log("There are fields with errors");else{var o=Object(v.a)({},t);delete o.cpassword,n.props.createUserAccount(o)}},n.state={input:{name:"",email:"",nickname:"",password:"",cpassword:""}},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.state.input,t=e.name,n=e.email,a=e.password,r=e.cpassword,o=e.nickname;return c.a.createElement("div",{className:"camp-auth-container"},c.a.createElement("h1",{className:"camp-auth-title"},"Create Account"),c.a.createElement("form",{onSubmit:this.createUserAccount,noValidate:!0},c.a.createElement("div",null,c.a.createElement("label",{htmlFor:"name"},"Full Name",c.a.createElement("input",{type:"text",id:"name",placeholder:"James Allen",onChange:this.handleInputChange,value:t}))),c.a.createElement("div",null,c.a.createElement("label",{htmlFor:"email"},"Email",c.a.createElement("input",{type:"email",id:"email",placeholder:"Email",onChange:this.handleInputChange,value:n}))),c.a.createElement("div",null,c.a.createElement("label",{htmlFor:"nickname"},"Nickname",c.a.createElement("input",{type:"text",id:"nickname",placeholder:"Nickname",onChange:this.handleInputChange,value:o}))),c.a.createElement("div",null,c.a.createElement("label",{htmlFor:"cpassword"},"Password",c.a.createElement("input",{type:"password",id:"password",placeholder:"Password",onChange:this.handleInputChange,value:a}))),c.a.createElement("div",null,c.a.createElement("label",{htmlFor:"cpassword"},"Confirm Password",c.a.createElement("input",{type:"password",id:"cpassword",placeholder:"Confirm Password",onChange:this.handleInputChange,value:r}))),c.a.createElement("div",null,c.a.createElement("button",{type:"submit"},"Create Account"))))}}]),t}(a.Component),H=Object(h.b)((function(e){return{}}),(function(e){return{createUserAccount:function(t){return e(function(e){return function(t){t(M(!0)),V.a.post(g,e,{withCredentials:!0}).then((function(e){console.log(e.data),t(M(!1))})).catch((function(e){console.log(e),t(M(!1))}))}}(t))}}}))(W),Y=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).handleInputChange=function(e){var t=e.target,a=t.id,c=t.value,r=Object(v.a)({},n.state.input,Object(f.a)({},a,c));n.setState({input:r})},n.login=function(e){e.preventDefault();var t=n.state.input;n.props.login(t)},n.state={input:{username:"",password:""}},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.state.input,t=e.username,n=e.password;return c.a.createElement("div",{className:"camp-auth-container"},c.a.createElement("h1",{className:"camp-auth-title"},"Login"),c.a.createElement("form",{onSubmit:this.login,noValidate:!0},c.a.createElement("div",null,c.a.createElement("label",{htmlFor:"username"},c.a.createElement("input",{type:"text",placeholder:"username or email",id:"username",value:t,onChange:this.handleInputChange}))),c.a.createElement("div",null,c.a.createElement("label",{htmlFor:"password"},c.a.createElement("input",{type:"password",placeholder:"Password",id:"password",value:n,onChange:this.handleInputChange}))),c.a.createElement("div",null,c.a.createElement("button",{type:"submit"},"Login"))))}}]),t}(a.Component),q=Object(h.b)((function(e){return{}}),(function(e){return{login:function(t){return e(function(e){return function(t){t(G(!0)),V.a.post(b,e,{withCredentials:!0}).then((function(e){console.log(e.data),t(G(!1))})).catch((function(e){return t(G(!1))}))}}(t))}}}))(Y),Z=function(e){return{type:"SET_VIEWED_PROFILE",payload:e}},J=function(e){return{type:"SET_VIEWED_USER_SAYS",payload:e}},$=function(e){return{type:"SET_RELATIONSHIP",payload:e}},K=function(e){return function(t){t(z(!0)),V.a.get("".concat(j,"/").concat(e),{withCredentials:!0}).then((function(e){var n=e.data;t(J(n.says)),t(z(!1))})).catch((function(e){return z(!1)}))}},Q=(n(102),n(150)),X=n(151),ee=n(152),te=n(153),ne=n(154),ae=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={user:null},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.setState({user:this.props.user})}},{key:"render",value:function(){var e=this.state.user,t=(e||{})._id;return c.a.createElement("div",{className:"camp-navigation-bar"},c.a.createElement("nav",{className:"camp-mobile-navigation-bar"},c.a.createElement("div",null,c.a.createElement(p.c,{to:"/",exact:!0,activeClassName:"camp-active-nav"},c.a.createElement(Q.a,{fontSize:"default",className:"camp-navigation-icon"}))),c.a.createElement("div",null,c.a.createElement(p.c,{to:"/search",exact:!0,activeClassName:"camp-active-nav"},c.a.createElement(X.a,{fontSize:"default",className:"camp-navigation-icon"}))),c.a.createElement("div",null,c.a.createElement(p.c,{to:"/messages",exact:!0,activeClassName:"camp-active-nav"},c.a.createElement(ee.a,{fontSize:"default",className:"camp-navigation-icon"}))),c.a.createElement("div",null,c.a.createElement(p.c,{to:"/profile/".concat(t),exact:!0,activeClassName:"camp-active-nav"},c.a.createElement(te.a,{fontSize:"default",className:"camp-navigation-icon"}))),c.a.createElement("div",null,c.a.createElement(p.c,{to:"/notifications",exact:!0,activeClassName:"camp-active-nav"},c.a.createElement(ne.a,{fontSize:"default",className:"camp-navigation-icon"})))))}}]),t}(a.Component),ce=Object(h.b)((function(e){return{user:e.authentication.user}}),null)(ae),re=n(73),oe=n.n(re),ie=function(e){return function(t){V.a.post(C,{say:e},{withCredentials:!0}).then((function(e){})).catch((function(e){return console.log(e)}))}},se=function(e){return{type:"SET_FEEDS",payload:e}},le=n(155),ue=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).handleInputChange=function(e){var t=e.target.value;n.setState({postText:t})},n.postSomething=function(e){e.preventDefault();var t=n.state.postText;""!==t&&(n.props.postSay(t),n.setState({postText:""}))},n.unfollowUser=function(){var e=n.props,t=e.user;return(0,e.unfollowUser)(t._id)},n.followUser=function(){var e=n.props,t=e.user;return(0,e.followUser)(t._id)},n.state={postText:""},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.state.postText,t=this.props,n=t.page,a=t.isAuthUser,r=t.user,o=t.relationship,i=o||{},s=i.isMutual,l=i.isFollowing,u=r.name,m=r.nickname,d=r._id,h="profile"!==n||a?c.a.createElement(c.a.Fragment,null):c.a.createElement("div",{className:"camp-relation-container"},l||s?c.a.createElement("button",{className:"camp-relation camp-relation-unfollow",onClick:this.unfollowUser},"Unfollow"):c.a.createElement("button",{className:"camp-relation camp-relation-follow",onClick:this.followUser},"Follow"),s&&c.a.createElement(p.b,{to:"/chat/".concat(d)},c.a.createElement(le.a,{color:"action"})));return c.a.createElement("div",{className:"camp-balloon-head"},c.a.createElement("div",{className:"camp-head-top"},c.a.createElement("div",{className:"camp-user-avatar"}),c.a.createElement("div",{className:"camp-user-details"},c.a.createElement("h3",null,"".concat(u)),c.a.createElement("p",null,"@".concat(m)))),a&&c.a.createElement("div",{className:"camp-head-bottom"},c.a.createElement("form",{noValidate:!0,onSubmit:this.postSomething},c.a.createElement("textarea",{placeholder:"Have a say",value:e,onChange:this.handleInputChange}),c.a.createElement("button",null,"Make post"))),h)}}]),t}(a.Component),me=Object(h.b)((function(e){return{}}),(function(e){return{postSay:function(t){return e(function(e){return function(t){V.a.post(w,{content:e},{withCredentials:!0}).then((function(e){var t=new Audio(oe.a);t.play().then((function(){t.remove()})).catch((function(e){return console.log(e)}))})).catch((function(e){console.log(e)}))}}(t))},followUser:function(t){return e(function(e){return function(t){V.a.post(k,{whomToFollow:e},{withCredentials:!0}).then((function(e){console.log("data ",e.data)})).catch((function(e){return console.log(e)}))}}(t))},unfollowUser:function(t){return e(function(e){return console.log("let us unfollow user"),function(t){V.a.post(I,{whoToUnfollow:e},{withCredentials:!0}).then((function(e){console.log(e.data)})).then((function(e){return console.log(e)}))}}(t))}}}))(ue),pe=n(156),de=n(157),he=n(36),fe=n.n(he),ve=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props,t=e.says,n=e.likeOrUnlike,a=t?t.map((function(e,t){var a=e.content,r=e.said_by,o=e._id,i=e.likes,s=e.comments,l=r.name,u=r.nickname,m=r._id;return c.a.createElement("div",{className:"camp-a-say",key:t},c.a.createElement("div",{className:"camp-say-top"},c.a.createElement("div",{className:"camp-say-talker"}),c.a.createElement("div",{className:"camp-say-talker-details"},c.a.createElement("h4",null,c.a.createElement(p.b,{to:"/profile/".concat(m)},"".concat(l))),c.a.createElement("p",null,"@".concat(u))),c.a.createElement("div",{className:"camp-say-time"},c.a.createElement("p",null,"just now"))),c.a.createElement("div",{className:"camp-say-bottom"},c.a.createElement("div",{className:"camp-say-say"},c.a.createElement("p",null,a)),c.a.createElement("div",{className:"camp-say-reaction"},c.a.createElement("button",{onClick:function(){var e=new Audio(fe.a);e.play().then((function(){e.remove()})).catch((function(e){return console.log(e)})),n(o)}},i.length,c.a.createElement(pe.a,{fontSize:"small",color:"secondary",className:"camp-react"})),c.a.createElement(p.b,{to:{pathname:"/view-post/".concat(o),say:e}},s.length," ",c.a.createElement(de.a,{fontSize:"small",className:"camp-react"})))))})):c.a.createElement("div",null,"hello");return c.a.createElement("div",{className:"camp-render-says"},a)}}]),t}(a.Component),Ee=Object(h.b)(null,(function(e){return{likeOrUnlike:function(t){return e(ie(t))}}}))(ve),ge=n(23),be=n.n(ge),ye=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={isAuthUsers:!1,page:"profile",feeds_socket:null},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=this.props.user,n=t._id,a=this.props.match.params.profile_id,c=be.a.connect("http://localhost:5000/profile");n===a?(this.setState({isAuthUser:!0,feeds_socket:c}),this.props.setViewProfile(t),this.props.getUserSays(n)):(this.setState({isAuthUser:!1}),this.props.getUserProfile(a),this.props.checkRelationship(a),setInterval((function(){c.emit("get_relationship",{authUserId:n,profile_id:a})}),500)),c.on("connect",(function(){e.setState({feeds_socket:c}),c.on("set_profile_feeds",(function(t){e.props.setFeeds(t)})),c.on("set_relationship",(function(t){e.props.setRelationship(t)}))})),setInterval((function(){var t=e.state.isAuthUser;c.emit("get_profile_feeds",{oldFeeds:e.props.says,profile_id:t?n:a})}),500)}},{key:"componentWillUnmount",value:function(){this.state.feeds_socket.disconnect(),this.setState({feeds_socket:null}),this.props.setFeeds([]),this.props.setRelationship({}),this.props.setViewProfile({})}},{key:"render",value:function(){var e=this.props,t=e.says,n=e.viewed_profile,a=e.isgettingprofile,r=e.isgettingsays,o=e.relationship,i=this.state,s=i.isAuthUser,l=i.page;return c.a.createElement(c.a.Fragment,null,c.a.createElement(ce,null),c.a.createElement("div",{className:"camp-main-content"},r||a?c.a.createElement("p",null,"Getting details hold on"):c.a.createElement(c.a.Fragment,null,c.a.createElement(me,{isAuthUser:s,page:l,user:n,relationship:o}),c.a.createElement(Ee,{says:t})," ")))}}]),t}(a.Component),Oe=Object(h.b)((function(e){var t=e.authentication,n=e.profile,a=e.interactions;return{user:t.user,says:n.viewed_user_says,viewed_profile:n.viewed_user,isgettingprofile:a.isgettingprofiledetails,isgettingsays:a.isgettingsays,relationship:n.viewedProfileRelationship}}),(function(e){return{setViewProfile:function(t){return e(Z(t))},getUserSays:function(t){return e(K(t))},getUserProfile:function(t){return e(function(e){return function(t){t(L(!0)),V.a.get("".concat(O,"/").concat(e),{withCredentials:!0}).then((function(n){var a=n.data.user;t(Z(a)),t(K(e)),t(L(!1))})).then((function(e){return t(L(!1))}))}}(t))},checkRelationship:function(t,n){return e(function(e){return function(t){V.a.get("".concat(_,"/").concat(e),{withCredentials:!0}).then((function(e){var n=e.data;console.log(n),t($(n))})).catch((function(e){return console.log(e)}))}}(t))},setRelationship:function(t){return e($(t))},setFeeds:function(t){return e(J(t))}}}))(ye),_e=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={feeds_socket:null},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.props.loadFeeds();var t=this.props,n=t.newsfeeds,a=t.user,c=be.a.connect("http://localhost:5000/feeds");c.on("connect",(function(){e.setState({feeds_socket:c}),c.on("got_new_feeds",(function(t){e.props.setFeeds(t)}))})),setInterval((function(){c.emit("get_feeds_update",{oldFeeds:n,authuserid:a._id})}),500)}},{key:"componentWillUnmount",value:function(){this.state.feeds_socket.disconnect(),this.setState({feeds_socket:null})}},{key:"render",value:function(){var e=this.props.user;return e?c.a.createElement(c.a.Fragment,null,c.a.createElement(ce,null),c.a.createElement("div",{className:"camp-main-content"},c.a.createElement(me,{isAuthUser:!0,user:e}),c.a.createElement(Ee,{says:this.props.newsfeeds.reverse()}))):c.a.createElement(d.a,{to:"/auth/login"})}}]),t}(a.Component);_e.getDerivedStateFromProps=function(){};var Se=Object(h.b)((function(e){var t=e.authentication,n=e.conversation;return{user:t.user,newsfeeds:n.newsfeeds}}),(function(e){return{loadFeeds:function(){return e((function(e){V.a.get(S,{withCredentials:!0}).then((function(t){var n=t.data.feeds;e(se(n))})).catch((function(e){return console.log(e)}))}))},setFeeds:function(t){return e(se(t))}}}))(_e),je=(n(70),function(e){var t=e.authuser,n=e.conversations;console.log(n);var a=n.map((function(e,n){var a=e.messages,r=e.user1,o=e.user2,i=t._id===r._id?o:r,s=a[a.length-1].body.length>30?"".concat(a[a.length-1].body.slice(0,30),"......"):a[a.length-1].body;return c.a.createElement(p.b,{to:"/chat/".concat(i._id),className:"camp-a-card",key:n},c.a.createElement("div",{className:"camp-a-card-left"}),c.a.createElement("div",{className:"camp-a-card-right"},c.a.createElement("h4",null,i.name),c.a.createElement("p",null,s)))}));return c.a.createElement(c.a.Fragment,null,a)}),we=(n(135),function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.props.getConversations()}},{key:"render",value:function(){var e=this.props,t=e.conversations,n=e.authuser;return c.a.createElement(c.a.Fragment,null,c.a.createElement(ce,null),c.a.createElement("div",{className:"camp-main-content"},c.a.createElement(je,{conversations:t,authuser:n})))}}]),t}(a.Component)),Ne=Object(h.b)((function(e){var t=e.conversation,n=e.authentication;return{conversations:t.conversations,authuser:n.user}}),(function(e){return{getConversations:function(){return e((function(e){V.a.get(T,{withCredentials:!0}).then((function(t){return console.log(t.data.conversations),e({type:"GET_CONVERSATIONS",payload:t.data.conversations.reverse()})})).catch((function(e){return console.log(e)}))}))}}}))(we),Ce=(n(136),n(158)),ke=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).handleInputChange=function(e){var t=e.target.value,a=n.state,c=a.chat_nsp,r=a.friend;""!==t&&t.length>0?c.emit("typing",{friend:r._id}):c.emit("done_typing",{friend:r._id}),n.setState({body:t})},n.sendMessage=function(e){e.preventDefault();var t=n.state,a=t.body,c=t.friend,r=t.chat_nsp,o=n.props.authuser;if(""!==a&&""!==a.trimLeft()&&""!==a.trimRight()){var i={body:a,friendid:c._id},s=Object(v.a)({},i,{time:Date.now()});r.emit("new_message",s),n.setState({body:"",typing:!1},(function(){r.emit("done_typing",{friend:c._id}),n.chatBodyRef.scrollTop=n.chatBodyRef.scrollHeight})),n.props.appendMessage(Object(v.a)({},s,{sender:o._id})),n.props.sendMessage(i)}},n.state={body:"",chat_nsp:null,typing:!1,friend:{},friendid:""},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=this.props.match.params.friendid,n=this.props.authuser._id;this.setState({friendid:t},(function(){e.props.fetchConversation(t)}));var a=be.a.connect("http://localhost:5000/chat");a.on("connect",(function(){e.setState({chat_nsp:a}),a.emit("user_connected",{user:n}),a.on("typing",(function(){e.setState({typing:!0})})),a.on("done_typing",(function(){e.setState({typing:!1})})),a.on("new_message",(function(t){var n=e.state.friend;e.props.appendMessage(Object(v.a)({},t,{sender:n._id}))}))}))}},{key:"componentDidUpdate",value:function(){this.chatBodyRef.scrollTop=this.chatBodyRef.scrollHeight}},{key:"componentWillUnmount",value:function(){this.state.chat_nsp.disconnect(),this.setState({chat_nsp:null})}},{key:"render",value:function(){var e=this,t=this.state,n=t.body,a=t.typing,r=t.friend,o=this.props,i=o.authuser,s=o.chatConversation,l=i._id,u=s.conversation?this.props.chatConversation.conversation.messages.map((function(e,t){var n=e.body,a=e.sender;return c.a.createElement("div",{className:"camp-chat-balloon ".concat(a===l?"camp-balloon-authuser":"camp-balloon-friend"),key:t},c.a.createElement("div",{className:"camp-balloon"},c.a.createElement("p",null,n)))})):c.a.createElement("p",null,"No message oo");return c.a.createElement(c.a.Fragment,null,c.a.createElement(ce,null),c.a.createElement("div",{className:"camp-main-content"},c.a.createElement("div",{className:"camp-active-chat-bubble"},c.a.createElement("div",{className:"camp-bubble-head"},c.a.createElement("div",{className:"camp-bubble-head-user"}),c.a.createElement("div",{className:"camp-bubble-head-user-details"},c.a.createElement("h4",null,r.name),a?c.a.createElement("p",{style:{color:"green",fontWeight:"bolder"}},"typing..."):c.a.createElement("p",null,"@",r.nickname))),c.a.createElement("div",{className:"camp-bubble-body",ref:function(t){return e.chatBodyRef=t}},u),c.a.createElement("div",{className:"camp-bubble-leg"},c.a.createElement("form",{noValidate:!0,onSubmit:this.sendMessage},c.a.createElement("textarea",{placeholder:"Your message...",value:n,onChange:this.handleInputChange}),c.a.createElement("button",null,c.a.createElement(Ce.a,{fontSize:"default"})))))))}}],[{key:"getDerivedStateFromProps",value:function(e,t){var n=e.chatConversation,a=e.authuser;if("undefined"!==typeof n.conversation){var c=n.conversation,r=c.user1,o=c.user2;return{friend:a._id===r._id?o:r}}return{}}}]),t}(a.Component),Ie=Object(h.b)((function(e){var t=e.conversation,n=e.authentication;return{chatConversation:t.activeBubble,authuser:n.user}}),(function(e){return{fetchConversation:function(t,n){return e(function(e){return function(t){V.a.get("".concat(A,"/").concat(e),{withCredentials:!0}).then((function(e){t({type:"GET_ACTIVE_CONVERSATION",payload:e.data})})).catch((function(e){return console.log(e)}))}}(t))},sendMessage:function(t){return e(function(e){return function(t){V.a.post(U,e,{withCredentials:!0}).then((function(e){})).catch((function(e){return console.log(e)}))}}(t))},appendMessage:function(t){return e(function(e){return{type:"APPEND_MESSAGE",payload:e}}(t))}}}))(ke),Te=(n(137),function(e){var t=e.searchedusers,n=e.authuser._id,a=t.map((function(e,t){var a=e._id,r=e.name,o=e.nickname;return n===a?null:c.a.createElement("p",{className:"camp-a-search",key:t},c.a.createElement(p.b,{to:"/profile/".concat(a)},"".concat(r)),c.a.createElement("span",null,"@",o))}));return c.a.createElement("div",{className:"camp-search-results"},a)}),Ae=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).handleInputChange=function(e){var t=e.target.value;n.setState({searchquery:t})},n.findUser=function(e){console.log("finding user"),e.preventDefault();var t=n.state.searchquery;console.log(t),""!==t.trimLeft()&&""!==t.trimRight()&&n.props.findUser(t)},n.state={searchquery:""},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.state.searchquery,t=this.props,n=t.searchedusers,a=t.authuser;return c.a.createElement(c.a.Fragment,null,c.a.createElement(ce,null),c.a.createElement("div",{className:"camp-main-content"},c.a.createElement("div",{className:"camp-search-container"},c.a.createElement("form",{noValidate:!0,onSubmit:this.findUser},c.a.createElement("input",{type:"text",placeholder:"search friend",value:e,onChange:this.handleInputChange}))),c.a.createElement(Te,{authuser:a,searchedusers:n})))}}]),t}(a.Component),Ue=Object(h.b)((function(e){var t=e.searches,n=e.authentication;return{searchedusers:t.searchedusers,authuser:n.user}}),(function(e){return{findUser:function(t){return e(function(e){return console.log("let find a user"),function(t){V.a.get("".concat(F,"/").concat(e),{withCredentials:!0}).then((function(e){var n=e.data.searchedusers;t({type:"SET_SEARCH_RESULT",payload:n})})).catch((function(e){return console.log(e)}))}}(t))}}}))(Ae),Fe=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.props.getUserNotifications()}},{key:"render",value:function(){return c.a.createElement(c.a.Fragment,null,c.a.createElement(ce,null),c.a.createElement("div",{className:"camp-main-content"},"user notifications"))}}]),t}(a.Component),Re=Object(h.b)((function(e){return{}}),(function(e){return{getUserNotifications:function(){return e((function(e){V.a.get(R,{withCredentials:!0}).then((function(t){var n=t.data.notifications;console.log(n),e(function(e){return{type:"SET_USER_NOTIFICATIONS",payload:e}}(n))})).catch((function(e){console.log(e)}))}))}}}))(Fe),Pe=(n(138),function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).handleInputChange=function(e){var t=e.target.value;n.setState({comment:t})},n.comment=function(e){e.preventDefault();var t=n.props.say._id,a=n.state.comment;""!==a.trimRight()&&""!==a.trimRight()&&(n.props.comment(a,t),n.setState({comment:""}))},n.state={comment:""},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.match.params.postid;this.props.getPost(e)}},{key:"render",value:function(){var e=this.props,t=e.say,n=e.isgettingsay,a=this.state.comment;if(n)return c.a.createElement(c.a.Fragment,null,c.a.createElement(ce,null),c.a.createElement("div",{className:"camp-main-content"},c.a.createElement("p",null,"Fetching data")));if("undefined"!=typeof t.said_by){var r=t.content,o=t.said_by,i=t._id,s=t.likes,l=t.comments,u=o.nickname,m=o.name,d=o._id;return c.a.createElement(c.a.Fragment,null,c.a.createElement(ce,null),c.a.createElement("div",{className:"camp-main-content"},c.a.createElement("div",{className:"camp-a-say"},c.a.createElement("div",{className:"camp-say-top"},c.a.createElement("div",{className:"camp-say-talker"}),c.a.createElement("div",{className:"camp-say-talker-details"},c.a.createElement("h4",null,c.a.createElement(p.b,{to:"/profile/".concat(d)},"".concat(m))),c.a.createElement("p",null,"@".concat(u))),c.a.createElement("div",{className:"camp-say-time"},c.a.createElement("p",null,"just now"))),c.a.createElement("div",{className:"camp-say-bottom"},c.a.createElement("div",{className:"camp-say-say"},c.a.createElement("p",null,r)),c.a.createElement("div",{className:"camp-comments"},l.length?l.map((function(e,t){var n=e.body;e.said_by;return c.a.createElement("p",{key:t},n)})):null),c.a.createElement("div",{className:"camp-say-comment-box"},c.a.createElement("form",{noValidate:!0,onSubmit:this.comment},c.a.createElement("textarea",{placeholder:"your comment",value:a,onChange:this.handleInputChange}),c.a.createElement("button",null,"comment"))),c.a.createElement("div",{className:"camp-say-reaction"},c.a.createElement("button",{onClick:function(){var e=new Audio(fe.a);e.play().then((function(){e.remove()})).catch((function(e){})),ie(d)}},s.length,c.a.createElement(pe.a,{fontSize:"small",color:"secondary",className:"camp-react"})),c.a.createElement("button",{to:{pathname:"/view-post/".concat(i),say:t}},l.length," ",c.a.createElement(de.a,{fontSize:"small",className:"camp-react"})))))))}return c.a.createElement(c.a.Fragment,null,c.a.createElement("p",null,"Ooops something is broken"))}}]),t}(a.Component)),xe=Object(h.b)((function(e){var t=e.conversation,n=e.interactions;return{say:t.viewedPost,isgettingsay:n.isgettingsinglesay}}),(function(e){return{likeOrUnlike:function(t){return e(ie(t))},getPost:function(t){return e(function(e){return function(t){t(B(!0)),V.a.get("".concat(P,"/").concat(e),{withCredentials:!0}).then((function(e){var n=e.data.say;t(B(!1)),t({type:"SET_VIEWED_POST",payload:n})})).catch((function(e){return console.log(e)}))}}(t))},comment:function(t,n){return e(function(e,t){return function(n){V.a.post(N,{body:e,postid:t},{withCredentials:!0}).then((function(e){})).catch((function(e){console.log(e)}))}}(t,n))}}}))(Pe),Ve=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={user:null},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props,t=e.isverifyingauth,n=e.Socket;e.user;return c.a.createElement(c.a.Fragment,null,t?c.a.createElement("div",{className:"App"},"Verifying authentication"):c.a.createElement(p.a,null,c.a.createElement("div",{className:"App"},c.a.createElement(d.d,null,c.a.createElement(d.b,{exact:!0,path:"/",render:function(e){return c.a.createElement(Se,Object.assign({},e,{Socket:n}))}}),c.a.createElement(d.b,{exact:!0,path:"/auth/signup",component:H}),c.a.createElement(d.b,{exact:!0,path:"/auth/login",component:q}),c.a.createElement(d.b,{exact:!0,path:"/profile/:profile_id",render:function(e){return c.a.createElement(Oe,Object.assign({},e,{Socket:n}))}}),c.a.createElement(d.b,{exact:!0,path:"/messages",render:function(e){return c.a.createElement(Ne,Object.assign({},e,{Socket:n}))}}),c.a.createElement(d.b,{exact:!0,path:"/chat/:friendid",render:function(e){return c.a.createElement(Ie,Object.assign({},e,{Socket:n}))}}),c.a.createElement(d.b,{exact:!0,path:"/search",render:function(e){return c.a.createElement(Ue,Object.assign({},e,{Socket:n}))}}),c.a.createElement(d.b,{exact:!0,path:"/notifications",render:function(e){return c.a.createElement(Re,Object.assign({},e,{Socket:n}))}}),c.a.createElement(d.b,{exact:!0,path:"/view-post/:postid",render:function(e){return c.a.createElement(xe,Object.assign({},e,{Socket:n}))}})))))}}]),t}(a.Component),De=Object(h.b)((function(e){var t=e.interactions,n=e.authentication;return{isverifyingauth:t.isverifyingauthentication,user:n.user}}),(function(e){return{}}))(Ve),Ge=n(22),Me={user:null},Le={viewed_user:{},viewed_user_says:[],viewedProfileRelationship:{},isFollowingUser:!1,relationshipIsMutual:!1},ze={isloggingin:!1,iscreatingaccount:!1,isverifyingauthentication:!1,isgettingprofiledetails:!1,isgettingsays:!1,isgettingsinglesay:!1},Be=n(37),We={conversations:[],activeBubble:{},newsfeeds:[],viewedPost:{}},He=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:We,t=arguments.length>1?arguments[1]:void 0,n=t.type,a=t.payload;switch(n){case"GET_CONVERSATIONS":e=Object(v.a)({},e,{conversations:a});break;case"GET_ACTIVE_CONVERSATION":e=Object(v.a)({},e,{activeBubble:a});break;case"SET_FEEDS":e=Object(v.a)({},e,{newsfeeds:a});break;case"SET_VIEWED_POST":e=Object(v.a)({},e,{viewedPost:a});break;case"APPEND_MESSAGE":var c=e.activeBubble.conversation.messages,r=e.activeBubble.conversation;e=Object(v.a)({},e,{activeBubble:Object(v.a)({},e.activeBubble,{conversation:Object(v.a)({},r,{messages:[].concat(Object(Be.a)(c),[a])})})})}return e},Ye={searchedusers:[]},qe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ye,t=arguments.length>1?arguments[1]:void 0,n=t.type,a=t.payload;switch(n){case"SET_SEARCH_RESULT":e=Object(v.a)({},e,{searchedusers:a})}return e},Ze={notifications:[]},Je=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ze,t=arguments.length>1?arguments[1]:void 0,n=t.type,a=t.payload;switch(n){case"SET_USER_NOTIFICATIONS":e=Object(v.a)({},e,{notifications:a})}return e},$e=Object(Ge.combineReducers)({authentication:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Me,t=arguments.length>1?arguments[1]:void 0,n=t.type,a=t.payload;switch(n){case"SET_ACTIVE_USER":e=Object(v.a)({},e,{user:a})}return e},profile:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Le,t=arguments.length>1?arguments[1]:void 0,n=t.type,a=t.payload;switch(n){case"SET_VIEWED_PROFILE":e=Object(v.a)({},e,{viewed_user:a});break;case"SET_VIEWED_USER_SAYS":e=Object(v.a)({},e,{viewed_user_says:a});break;case"SET_RELATIONSHIP":e=Object(v.a)({},e,{viewedProfileRelationship:a})}return e},interactions:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ze,t=arguments.length>1?arguments[1]:void 0,n=t.type,a=t.payload;switch(n){case"IS_VERIFYING_AUTHENTICATION":e=Object(v.a)({},e,{isverifyingauthentication:a});break;case"IS_CREATING_ACCOUNT":e=Object(v.a)({},e,{iscreatingaccount:a});break;case"IS_LOGGING_IN":e=Object(v.a)({},e,{isloggingin:a});break;case"IS_GETTING_PROFILE_DETAILS":e=Object(v.a)({},e,{isgettingprofiledetails:a});break;case"IS_GETTING_SAYS":e=Object(v.a)({},e,{isgettingsays:a});break;case"IS_GETTING_SAY":e=Object(v.a)({},e,{isgettingsinglesay:a})}return e},conversation:He,searches:qe,notification:Je}),Ke=n(74),Qe=n(75),Xe=Object(Qe.composeWithDevTools)(Object(Ge.applyMiddleware)(Ke.a)),et=Object(Ge.createStore)($e,void 0,Xe),tt=(n(139),be()("http://localhost:5000"));et.dispatch((function(e){e(D(!0)),V.a.post(y,null,{withCredentials:!0}).then((function(t){var n=t.data.user;e(function(e){return{type:"SET_ACTIVE_USER",payload:e}}(n)),e(D(!1))})).catch((function(t){console.log(t),e(D(!1))}))})),o.a.render(c.a.createElement(h.a,{store:et},c.a.createElement(De,{Socket:tt})),document.getElementById("root"))},36:function(e,t,n){e.exports=n.p+"static/media/get-outta-here.4633ab40.ogg"},56:function(e,t,n){},70:function(e,t,n){},73:function(e,t,n){e.exports=n.p+"static/media/insight.3290a035.ogg"},77:function(e,t,n){e.exports=n(140)}},[[77,1,2]]]);
//# sourceMappingURL=main.2e5a661c.chunk.js.map