export const newProject=(state=0,action)=>{
   switch(action.type){
       case 'NEW_PROJECT':
           return action.id
        default:
            return state
   }
}

export const listProjects=(state=[],action)=>{
   switch(action.type){
       case 'LIST_PROJECTS':
           return action.projects
        default:
            return state
   }
}