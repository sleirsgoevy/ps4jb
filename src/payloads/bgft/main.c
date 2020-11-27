#include <stddef.h>
#include <sys/mman.h>

enum bgft_task_option_t {
	BGFT_TASK_OPTION_NONE = 0x0,
	BGFT_TASK_OPTION_DELETE_AFTER_UPLOAD = 0x1,
	BGFT_TASK_OPTION_INVISIBLE = 0x2,
	BGFT_TASK_OPTION_ENABLE_PLAYGO = 0x4,
	BGFT_TASK_OPTION_FORCE_UPDATE = 0x8,
	BGFT_TASK_OPTION_REMOTE = 0x10,
	BGFT_TASK_OPTION_COPY_CRASH_REPORT_FILES = 0x20,
	BGFT_TASK_OPTION_DISABLE_INSERT_POPUP = 0x40,
	BGFT_TASK_OPTION_DISABLE_CDN_QUERY_PARAM = 0x10000,
};

struct bgft_download_param {
	int user_id;
	int entitlement_type;
	const char* id;
	const char* content_url;
	const char* content_ex_url;
	const char* content_name;
	const char* icon_path;
	const char* sku_id;
	enum bgft_task_option_t option;
	const char* playgo_scenario_id;
	const char* release_date;
	const char* package_type;
	const char* package_sub_type;
	unsigned long package_size;
};

struct bgft_download_param_ex {
	struct bgft_download_param param;
	unsigned int slot;
};

struct bgft_task_progress_internal {
	unsigned int bits;
	int error_result;
	unsigned long length;
	unsigned long transferred;
	unsigned long length_total;
	unsigned long transferred_total;
	unsigned int num_index;
	unsigned int num_total;
	unsigned int rest_sec;
	unsigned int rest_sec_total;
	int preparing_percent;
	int local_copy_percent;
};

#define BGFT_INVALID_TASK_ID (-1)

struct bgft_init_params {
	void* mem;
	unsigned long size;
};

void* dlopen(const char*, int);
void* dlsym(void*, const char*);

int main()
{
    int rv;
    void* bgft = dlopen("/system/common/lib/libSceBgft.sprx", 0);
    int(*sceBgftInitialize)(struct bgft_init_params*) = dlsym(bgft, "sceBgftServiceIntInit");
    int(*sceBgftDownloadRegisterTaskByStorage)(struct bgft_download_param*, int*) = dlsym(bgft, "sceBgftServiceIntDownloadRegisterTaskByStorage");
    int(*sceBgftDownloadStartTask)(int) = dlsym(bgft, "sceBgftServiceIntDownloadStartTask");
    struct bgft_init_params ip = {
        .mem = mmap(NULL, 0x100000, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0),
        .size = 0x100000,
    };
    rv = sceBgftInitialize(&ip);
    struct bgft_download_param params = {
        .entitlement_type = 5,
        .id = "",
        .content_url = "/user/home/app.pkg",
        .content_name = "app.pkg",
        .icon_path = "",
        .playgo_scenario_id = "0",
        .option = BGFT_TASK_OPTION_DISABLE_CDN_QUERY_PARAM,
    };
    int task = BGFT_INVALID_TASK_ID;
    rv = sceBgftDownloadRegisterTaskByStorage(&params, &task);
    rv = sceBgftDownloadStartTask(task);
    return 0;
}
