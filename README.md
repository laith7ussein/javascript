# Jquery draggable with scale or zoom

This function will solve the issue of using draggable library with scaled html element, if your are using zoom proprty, then you should change it to

selector {

  trnsform: scale(value);
  
}

Instead of

selector {

  zoom: value;
  
}

<ul>
  <li>asd</li>
  <li>asd</li>
</ul>
