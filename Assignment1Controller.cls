public class Assignment1Controller {
    @AuraEnabled(cacheable=true)
    public static List<Account> getgroups(String nameVal, Integer numOfRec)
    {
        String nameValNew = '%'+nameVal+'%';
        return [SELECT id, name FROM account where name LIKE :nameValNew LIMIT :numOfRec];
    }
}