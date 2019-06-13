import messages from '../common/messages'

/*

To check available models go to Public/js/global_info.js

*/
var model_load = function model_load(graph,models,m_code){
    var layers = {}; 
    if(m_code){
        //load saved model
        var doc = mxUtils.parseXml(m_code);
        var codec = new mxCodec(doc);
        codec.decode(doc.documentElement, graph.getModel());
        
        var root = graph.getModel().getRoot();

        var maxVal = root.getChildCount();
        for (var i = 0; i < models.length; i++) {
            if(i<maxVal){
                var current_cell = root.getChildAt(i);
                var c_id = current_cell.getId();
                if(c_id==models[i]){
                    layers[models[i]]=current_cell;
                }else{
                    var valid_cell=false;
                    for (var j = 0; j < models.length; j++) {
                        if(c_id==models[j]){
                            layers[models[j]]=current_cell;
                            valid_cell=true;
                        }
                    }
                    
                    if(!valid_cell){
                        console.log(messages["model_load_invalid_cell"]);
                    }
                }
            }else{
                var cell=new mxCell();
                layers[models[i]]=root.insert(cell);
                cell.setId(models[i]);
            }
        }
    }else{
        //create base model (first child represent feature model, second child component model, etc)
        var root = new mxCell();
        for (var i = 0; i < models.length; i++) {
            var m_cell =new mxCell();
            m_cell.setId(models[i]);
            layers[models[i]]=root.insert(m_cell);
        }
        graph.getModel().setRoot(root);
    }
    return layers;
}

export default model_load