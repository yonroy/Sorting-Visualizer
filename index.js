var size = 5
var speed = 1000
var sort = ""
var sort_success = false
var stop_sorted = true
var new_array = false
var wrap_width = 1110
const container = document.querySelector(".container-columns");
document.querySelector("#changeSpeed").value = 0
document.querySelector("#changeSize").value = 0
NewArray()


function showSize(val){
    let text = ""
    size = val
    container.innerHTML = ""
    var x = null;
    if(window.innerWidth<600){
        wrap_width = 360
        document.querySelector("#changeSize").max = 100
    }
    else{
        wrap_width = 1110
    }
    console.log(wrap_width,Number(size))
    console.log((wrap_width/Number(size))-4)
    for (let i = 0; i < val; i++) {
        random= Math.floor(Math.random() * 500)
        text+= `<div class="colum "}px;" style="width:${(wrap_width/Number(size))-2}px;height:${random}px; font-size:${21-size<0?0:21-size+10}px; ">${random}</div>`;
      }
      container.innerHTML =text
      if(21-size<0){
        document.querySelector(".container-columns").classList.add('normal');
        document.querySelector(".container-columns").classList.remove('active');
      }
      else{
        document.querySelector(".container-columns").classList.add('active');
        document.querySelector(".container-columns").classList.remove('normal');
      }
      
      sort_success = false
      if(stop_sorted==false){
        sorted()
    }
}
function showSpeed(val){
   speed=1000-val*10
   console.log(speed)
}
function NewArray(){
    let text = ""
    document.querySelector("#changeSize").value = size
    container.innerHTML = ""
    if (size<5){size = 5}
    
    if(window.innerWidth<600){
        wrap_width = 360
        document.querySelector("#changeSize").max = 100
        document.querySelector(".Newarr").innerText = 'New'
    }
    else{
        wrap_width = 1110
    }
    for (let i = 0; i < size; i++) {
        random= Math.floor(Math.random() * 500)+10
        text+= `<div class="colum" style="width:${(wrap_width/size-2)}px;height:${random}px; font-size:${21-size<0?0:21-size+10}px; ">${random}</div>`;
      }
      container.innerHTML =text
    if(stop_sorted==false){
        sorted()
    }
    sort_success = false
    document.querySelector(".navbar-btn").classList.add('btn-success');
    document.querySelector(".navbar-btn").classList.remove('btn-danger');
}
async function bubble(){
    columns = document.getElementsByClassName('colum')
    console.log("lenght",columns.length)
    for (var i = 0; i < columns.length; i++) {
        var g=0
        for (var j = 0; j < columns.length-i-1; j++){
            // columns[j+1].style.backgroundColor = "green"
            // columns[j].style.backgroundColor = "green"
            
            // h1 = columns[j].style.height 
            // h2 = columns[j+1].style.height 
            
            var value1 = columns[j].clientHeight;
            var value2 = columns[j + 1].clientHeight;
            columns[j].style.backgroundColor = "green"
            columns[j+1].style.backgroundColor = "green"
            if (value1 >value2){
                await swap(columns[j+1],columns[j])
               
                // [columns[j+1].innerText,columns[j].innerText] = [columns[j].innerText,columns[j+1].innerText];
            }
            columns[j].style.backgroundColor = "rgba(66, 134, 244, 0.8)"
            g+=1
            if (stop_sorted == true) {
                columns[g].style.backgroundColor = "rgba(66, 134, 244, 0.8)" 
                
                return
            };
        }
        columns[g].style.backgroundColor = "rgba(168, 112, 134, 1)"
        
    }
    stop_sorted = true
    document.querySelector(".navbar-btn").classList.add('btn-success');
    document.querySelector(".navbar-btn").classList.remove('btn-danger');
}
async function quick(){
    
    columns = document.getElementsByClassName('colum')
    
    async function partition(items, left, right) {
        var pivot   = items[left] //middle element
        pivot.style.backgroundColor = 'rgba(181,120,232,1)'
        var    i       = left //left pointer
        var    j       = right //right pointer
        pivot.style.backgroundColor = 'yellow';
        while (i <= j) {
            if (stop_sorted == true) return;
            while (items[i].clientHeight < pivot.clientHeight) {
                
                if(i!=left){
                    items[i].style.backgroundColor = "green"
                }
                i++;
                if(i-1!=left){
                items[i-1].style.backgroundColor = "rgba(66, 134, 244, 0.8)"
                }
            }
            while (items[j].clientHeight > pivot.clientHeight) {
                items[j].style.backgroundColor = "green"
                j--;
                items[j+1].style.backgroundColor = "rgba(66, 134, 244, 0.8)"
            }
            if (i <= j) {
                if(i!=left){
                    items[i].style.backgroundColor = "green"
                }
                items[j].style.backgroundColor = "green"
                await swap(items[i], items[j]); //swap two elements
                i++;
                j--;
                if(i-1!=left){
                    items[i-1].style.backgroundColor = "rgba(66, 134, 244, 0.8)"
                }
                items[j+1].style.backgroundColor = "rgba(66, 134, 244, 0.8)"
            
            }
        }
    if(sort_success == true) return;
    pivot.style.backgroundColor = 'rgba(168, 112, 134, 1)';
    items[i].style.backgroundColor = 'rgba(168, 112, 134, 1)';
    return i;
    }
    async function quickSort(items,left, right) {
        var index;
        if (sort_success == true) return;
        if (items.length > 1) {
            index = await partition(items,left, right); //index returned from partition
            if (sort_success == true) return;
            if (left < index-1) { //more elements on the left side of the pivot
                await quickSort(items,left, index-1 )
            }
            if (index < right) { //more elements on the right side of the pivot
                await quickSort( items,index, right);
            }
        }
        return items;
    }
    await quickSort(columns,0,columns.length-1)
    stop_sorted = true
    document.querySelector(".navbar-btn").classList.add('btn-success');
    document.querySelector(".navbar-btn").classList.remove('btn-danger');
}
    
async function Merge(){
    col = document.getElementsByClassName('colum');

    async function merge( arr,l, m, r)
    {
        let len = arr.length-1
        let color = ''
        
        if(len == r-l){
            color = 'rgba(168, 112, 134, 1)';
        }
        else{
            color = "rgba(66, 134, 244, 0.8)"
        }
        var n1 = m - l + 1;
        var n2 = r - m;
        // Create temp arrays
        var L = new Array(n1); 
        var R = new Array(n2);

        // Copy data to temp arrays L[] and R[]
        for (var i = 0; i < n1; i++)
            L[i] = arr[l + i].clientHeight;
        for (var j = 0; j < n2; j++)
            R[j] = arr[m + 1 + j].clientHeight;
        // Merge the temp arrays back into arr[l..r]
        // Initial index of first subarray
        var i = 0;
    
        // Initial index of second subarray
        var j = 0;
    
        // Initial index of merged subarray
        var k = l;
    
        while (i < n1 && j < n2) {
            if(stop_sorted == true) break
            arr[k].style.backgroundColor = 'green'
            
            if (L[i] <= R[j]){
                await assign(arr,k,L[i])
                i++;
            }
            else {
                await assign(arr,k,R[j])
                j++;
            }
            
            k++;
            arr[k-1].style.backgroundColor = color;
            
        }
    
        // Copy the remaining elements of
        // L[], if there are any
        while (i < n1) {
            if(stop_sorted == true) break
            arr[k].style.backgroundColor = 'green'
            await assign(arr,k,L[i])
            i++;
            k++;
            arr[k-1].style.backgroundColor = color;
            
        }
    
        // Copy the remaining elements of
        // R[], if there are any
        while (j < n2) {
            if(stop_sorted == true) break
            arr[k].style.backgroundColor = 'green';
            await assign(arr,k,R[j])
            j++;
            k++;
            arr[k-1].style.backgroundColor = color;
            
        }
    }
  
    // l is for left index and r is
    // right index of the sub-array
    // of arr to be sorted */
    async function mergeSort(arr,l, r){
        if(l>=r || stop_sorted){
            return;//returns recursively
        }
        var m =Math.floor((l+r)/2)
        await mergeSort(arr,l,m);
        await mergeSort(arr,m+1,r);
        await merge(arr,l,m,r);
        
    }
    await mergeSort(col,0,col.length-1)
    stop_sorted = true
    document.querySelector(".navbar-btn").classList.add('btn-success');
    document.querySelector(".navbar-btn").classList.remove('btn-danger');
    
    
}
async function Heap(){
    var array_length;
    col = document.getElementsByClassName('colum');
    async function heap_root(input, i) {
        if(stop_sorted == true) return;
        var left = 2 * i + 1;
        var right = 2 * i + 2;
        var max = i;
        if(left < array_length && input[left].clientHeight > input[max].clientHeight){
            max = left;
        }
    
        if (right < array_length && input[right].clientHeight > input[max].clientHeight)     {

            max = right;
        }
    
        if (max != i) {
            input[i].style.backgroundColor = 'green'
            input[max].style.backgroundColor = 'green'
            await swap(input[i], input[max]);
            input[i].style.backgroundColor = "rgba(66, 134, 244, 0.8)"
            input[max].style.backgroundColor = "rgba(66, 134, 244, 0.8)"
            await heap_root(input, max);
            
        }
    }
    
    async function heapSort(input) {
        
        array_length = input.length;
        for (var i = Math.floor(array_length / 2); i >= 0; i --){
            if(stop_sorted == true) break;
            await heap_root(input, i)
            
          }
        
        
        for (i = input.length - 1; i > 0; i--) {
            if(stop_sorted == true) break;
            await swap(input[0], input[i]);
            
            array_length--;
            input[array_length].style.backgroundColor = 'rgba(168, 112, 134, 1)';
            await heap_root(input, 0);
        }
        input[0].style.backgroundColor = 'rgba(168, 112, 134, 1)';
        
    }
    await heapSort(col)
    stop_sorted = true
    document.querySelector(".navbar-btn").classList.add('btn-success');
    document.querySelector(".navbar-btn").classList.remove('btn-danger');
    
}
function assign(arr,index,val){
    return new Promise((resolve) => {
    arr[index].style.height = val+'px'
    arr[index].textContent = val
    window.requestAnimationFrame(function() {
        // For waiting for .25 sec
        setTimeout(() => {
            resolve();
        }, speed);
        });
    });
}
function swap(el1, el2) {
    return new Promise((resolve) => {
        
        // For exchanging styles of two blocks
        var temp = el1.style.height;
        el1.style.height = el2.style.height;
        el2.style.height = temp;
        console.log('el1',el1,"el2",el2)
        var swa = el1.textContent
        el1.textContent = el2.textContent
        el2.textContent = swa
        console.log('el1',el1,"el2",el2)
        window.requestAnimationFrame(function() {
  
            // For waiting for .25 sec
            setTimeout(() => {
                resolve();
            }, speed);
        });
    });
}
function select_sort(that){
    
    sort = that.outerText
    arr_class = document.getElementsByClassName("Sort")
    console.log(sort)
    if (stop_sorted == true){
        for (let val of arr_class){
            if (sort==val.outerText){
                val.style.color = 'white'
            }
            else{
                val.style.color = 'gray'
            }
        }
    }
    
    
}
function sorted(){
    if (sort_success == true) return;
    stop_sorted = stop_sorted?false:true;
    if(document.querySelector(".container-columns").outerText=="") return
    if (stop_sorted == false){
        if(sort != ""){
            document.querySelector(".navbar-btn").classList.add('btn-danger');
            document.querySelector(".navbar-btn").classList.remove('btn-success');
            console.log(stop_sorted)
        }
        switch(sort) {
        
            case "Merge":
              // code block
              Merge()
              break;
            case "Heap":
              // code block
              Heap()
              break;
            case "Quick":
                // code block
                quick()
                break;
            case "Bubble":
                    // code block
                bubble()
                break;
            default:
                alert("Please select a sort method")
                break;
              // code block
          }
        
    }
    else{
        document.querySelector(".navbar-btn").classList.add('btn-success');
        document.querySelector(".navbar-btn").classList.remove('btn-danger');
        console.log(stop_sorted)
    }

    
}