# SwitchOS UI

This a project I made in my free time written in SolidJS and SASS with a little of tailwindcss I made it trying to replicate the Nintendo Switch's OS UI design, it is
part of a bigger project I'm going to develop which is Game's launcher similar to Playnite yet different 
I will make it have the functionalities that Playnite doesn't offer and more 

## Contribution

If by accident you found this repo and have the time to spare keep your code as clean as possible
and written in the following style:

### Functions and Classes

#### Always write the name in PascalCase
    function ShortName() {
        ...
    }

    class ShortName {
        ...
    }

#### Use descriptive names
Don't do this:
    function returnYear() {
        return 2023
    }
Do this:
    function returnCurrentYear() {
        return 2023
    }

### If/For/While Statements 

#### Always use the curly braces and don't put it on the same line as the keyword
if(true) 
{
    ShortName();
}

while(true)
{
    let shortName = new ShortName();
}

for(let i = 0; i < 10; i++)
{
    ShortName(i);
}

#### No Magic values that only have meaning to you

Don't do this: 
    if(var1>=(var2/var3)*var4)
    {
        DoStuff() 
    }

Do this:
    let someReleatedValue = var2/var3
    let conditionNameThatDescribesWhatIsThisAbout = var1>=(someReleatedValue)*var4
    if(conditionNameThatDescribesWhatIsThisAbout) 
    {
        DoStuff()
    }

### Todos
Use this notation for Todos:
TODOKEYWORD: TODO COMMENT

It would make it easier for me to search your todo/fixes/hacks/info

