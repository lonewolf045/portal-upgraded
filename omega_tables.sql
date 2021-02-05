create table depts (
	deptcode char(3) primary key,
	deptname char(30) not null
);

create table students(
	enroll int(9) primary key,
	firstName char(30),
	lastName char(30),
	bdate date check(bdate < '2003-01-01'),
	deptcode char(3) references depts(deptcode)
	on delete cascade,
	batch varchar(9),
	deg_code varchar(30) references degree(deg_code)
);

create table teachers (
	fac_code char(8),
	fac_id int(7),
	fac_firstName char(30) not null,
	fac_lastName char(30),
	fac_dept char(3) references depts(deptcode),
	fac_position  char(30) not null,
	primary key(fac_id,fac_code)
);

create table login (
	user_id varchar(30) primary key,
	password varchar(30),
	category int(2)
);

create table degree (
	deg_code varchar(30) primary key,
	deg_name varchar(30)
);

create table grp (
	grp_code varchar(30) primary key,
	grp_name varchar(30)
);

create table groupsmem (
	grp_code varchar(30),
	enroll int(9),
	primary key(enroll,grp_code)
);

create table assignments (
	f_code char(8) references teachers(fac_code),
	f_id int(7) references teachers(fac_id),
	crs_cd varchar(8) references courses(crs_code),
	prb_stmt longtext,
	deadline datetime,
	max_marks int(4),
	created datetime,
	asgn_code varchar(10),
	primary key(crs_cd,f_id,asgn_code)
);

create table submissions (
	stud_id int(9) references students(enroll),
	crs_cd varchar(8) references courses(crs_code),
	answer longtext,
	submitted datetime,
	grade int(4),
	asgn_cd varchar(10) references assignments(asgn_code),
	primary key(stud_id,crs_cd,asgn_cd)
);

create table courses (
	crs_code varchar(10) primary key,
	crs_name varchar(30),
	crs_fac int(7) references teachers(fac_id),
	crs_dept char(3) references depts(deptcode)
);

create table grp_crs(
	grp_cd varchar(30) references grp(grp_code),
	crs_cd varchar(30) references courses(crs_code)
);

