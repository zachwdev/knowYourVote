//Format data from the api call before inserting into DB.

var formatData = {

    capFirstLowerRest: function capFirstLowerRest(string) {
        return string.charAt(0).toUpperCase() + string.substr(1).toLowerCase();
    },

    // takes a string of either a single full name in (LAST, FIRST MIDDLE (NICKNAME)) or multiple names of the same format sepperated with &.
    formatCandidateNames: function formatCandidateNames(names) {
        var newName = [];
        var newIndividualName = [];
        names.split(' & ').forEach(function (individualName) {
            individualName = individualName.split(' ')
            newIndividualName.push(individualName[0]);
            newIndividualName.push(individualName[1]);
            newIndividualName.push(individualName[2].split('').shift() + '.')
            newName.push(newIndividualName.map(formatData.capFirstLowerRest).join(' '));
            newIndividualName = [];
        })

        return newName.join(' & ');
    },

    formatCandidateOfficeSought: function formatCandidateOfficeSought(officeSought){
        var newOfficeSought = []
        var wordArray = []
        officeSought.split(' / ').forEach(function(office){
            office = office.split(' ')
           newOfficeSought.push(office.map(formatData.capFirstLowerRest).join(' '));
            
        })
        return newOfficeSought.join('/')
    }


}


module.exports = formatData;