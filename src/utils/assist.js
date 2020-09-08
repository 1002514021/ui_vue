//find component
export function findComponentUpward (context,componentName,componentNames) {
    componentNames=typeof componentName ==='string'?[componentName]:componentName
    let parent = context.$parent
    let name = parent.$options.name
    while(parent && (!name || !componentNames.includes(name))){
        parent= parent.$parent
        if (parent) name = parent.$options.name
    }
    return parent
}
// find components
export function findComponentsUpward (context, componentName) {
    let parents = []
    const parent = context.$parent
    if (parent) {
        if (parent.$options.name === componentName) parents.push(parent)
        return parents.concat(findComponentsUpward(parent, componentName))
    } else {
        return []
    }
}
export function findComponentsDownward (context, componentName) {
    return context.$children.reduce((components, child) => {
        if (child.$options.name === componentName) components.push(child)
        const foundChilds = findComponentsDownward(child, componentName)
        return components.concat(foundChilds)
    }, [])
}


// hasClass
export function hasClass(el, cls) {
    if (!el || !cls) return false
    if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.')
    if (el.classList) {
        return el.classList.contains(cls)
    }
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
}

// addClass
export function addClass(el, cls) {
    if (!el) return
    let curClass = el.className
    const classes = (cls || '').split(' ')
    
    for (let i = 0, j = classes.length ;i < j; i++) {
        const clsName = classes[i]
        if (!clsName) continue

        if (el.classList) {
            return el.classList.add(clsName)
        }
        if (!hasClass(el, clsName)) {
            return curClass += ' ' + clsName
        }
    }
    if (!el.classList) {
        el.className = curClass
    }
}

// removeClass
export function removeClass(el, cls) {
    if (!el || !cls) return
    const classes = cls.split(' ')
    let curClass = ' ' + el.className + ' '

    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i]
        if (!clsName) continue
        if (el.classList) {
            return el.classList.remove(clsName)
        }
        if (hasClass(el, clsName)) {
            return curClass = curClass.replace(' ' + clsName + ' ', ' ')
        }
    }
    if (!el.classList) {
        el.className = trim(curClass)
    }
}
