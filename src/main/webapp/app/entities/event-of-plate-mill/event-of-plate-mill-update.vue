<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="platemillvuejsApp.eventOfPlateMill.home.createOrEditLabel">Create or edit a EventOfPlateMill</h2>
                <div>
                    <div class="form-group" v-if="eventOfPlateMill.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="eventOfPlateMill.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="event-of-plate-mill-eventDate">Event Date</label>
                        <div class="input-group">
                            <input id="event-of-plate-mill-eventDate" type="date" class="form-control" name="eventDate"  :class="{'valid': !$v.eventOfPlateMill.eventDate.$invalid, 'invalid': $v.eventOfPlateMill.eventDate.$invalid }"
                            v-model="$v.eventOfPlateMill.eventDate.$model"  required />
                        </div>
                        <div v-if="$v.eventOfPlateMill.eventDate.$anyDirty && $v.eventOfPlateMill.eventDate.$invalid">
                            <small class="form-text text-danger" v-if="!$v.eventOfPlateMill.eventDate.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="event-of-plate-mill-eventName">Event Name</label>
                        <input type="text" class="form-control" name="eventName" id="event-of-plate-mill-eventName"
                            :class="{'valid': !$v.eventOfPlateMill.eventName.$invalid, 'invalid': $v.eventOfPlateMill.eventName.$invalid }" v-model="$v.eventOfPlateMill.eventName.$model"  required/>
                        <div v-if="$v.eventOfPlateMill.eventName.$anyDirty && $v.eventOfPlateMill.eventName.$invalid">
                            <small class="form-text text-danger" v-if="!$v.eventOfPlateMill.eventName.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.eventOfPlateMill.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./event-of-plate-mill-update.component.ts">
</script>
