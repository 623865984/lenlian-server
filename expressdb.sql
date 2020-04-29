create database expressdb;
use expressdb;
set character_set_database=utf8;    
create table custuser(	
cno varchar(8) primary key,
nickname varchar(15) default 'Unknown',  
username varchar(20) not null,   
pwd varchar(20) not null,     
sex varchar(2) default 'ÄÐ',
creditnum bigint not null,     
phonenum varchar(11),
registdate varchar(10),   
workplace varchar(30)
);

create table custlist(		
lno varchar(15) primary key,
send_user varchar(10) not null,
take_user varchar(10) not null,
senduser_phone varchar(11) not null,
takeuser_phone varchar(11) not null,
goodname varchar(5) not null,     
goodtype varchar(5) not null,
send_place varchar(30) not null,     
take_place varchar(30) not null,    
ifcold tinyint(1) default '0' ,
listdate varchar(10)
);

create table driver(		
dno varchar(8) primary key,
username varchar(20) not null,   
pwd varchar(20) not null,     
lisence_type varchar(3) not null,     
drivername varchar(15) default 'Unknown', 
creditnum bigint not null,
phonenum varchar(11),
nowplace varchar(20),     
entry_date varchar(10)
);

create table manager(	
mno varchar(8) primary key,     
power tinyint(1) default '0'     
);

create table carinfo(		
cno varchar(5) primary key,     
carnum varchar(7) not null,    
ifcold varchar(3) default '·ñ',
nowplace varchar(20),    
update_time varchar(10)
);

create table deliverylist(	
dlno varchar(15) primary key,   
send_place varchar(30) not null,     
take_place varchar(30) not null,     
ifcold tinyint(1) default '0',	
cno varchar(5),
carnum varchar(7) not null,
dno varchar(8),
senduser_phone varchar(11) not null,	
takeuser_phone varchar(11) not null	
);

create table warehouse(	
wno varchar(3)	
);
 